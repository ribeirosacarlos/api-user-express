import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export async function register(req: Request, res: Response) {
    const user = await userService.register(req.body);
    res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
    const token = await userService.login(req.body);
    res.json({ token });
}