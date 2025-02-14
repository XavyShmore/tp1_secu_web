import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ message: 'Invalid email format. a@a.a requested' }, { status: 400 });
    }


    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        return NextResponse.json({ message: 'This email is already used.' }, { status: 400 });
    }

    if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        return NextResponse.json({message: 'Password is too simple.' }, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'User created', user, status: 201 });
}
