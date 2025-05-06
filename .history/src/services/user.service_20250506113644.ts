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
    return await prisma.user.creat({
        data: { ...parsed, password: hash },
    });
}