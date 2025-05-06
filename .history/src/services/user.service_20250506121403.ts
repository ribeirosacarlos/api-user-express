import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function register(data: any) {

    // Validação do ZOD
    const schema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
    });
    const parsed = schema.parse(data);

    const hash = await bcrypt.hash(parsed.password, 10);
    return await prisma.user.create({
        data: { ...parsed, password: hash },
    });
}

export async function login(data: any) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
    });
    const parsed = schema.parse(data);

    const user = await prisma.user.findUnique({
        where: { email: parsed.email },
    });

    if (!user || !(await bcrypt.compare(parsed.password, user.password))) {
        throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

export async function getAll(data: any) {
    const parsed = data;

    const users = await prisma.user.getAll();

    return users;
}