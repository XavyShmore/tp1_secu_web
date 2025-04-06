import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const contentValidator = z.string().regex(
    /^[a-zA-Z0-9<>[\]{}!@#$%^&*()\-+=_,\s]+$/,
    { message: 'Invalid content format.' }
);

const taskValidator = z.object({
    content: contentValidator,
    userId: z.string().uuid({ message: 'Invalid userId format.' }),
});

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');

        const userCookie = req.cookies.get("user")?.value;
        if (userCookie !== userId) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        if (!userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                content: true,
                completed: true,
            },
        });

        return NextResponse.json({tasks: tasks},{ status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ message: "Error fetching tasks" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { content, userId } = await req.json();

        const userCookie = req.cookies.get("user")?.value;
        if (userCookie !== userId) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const validationResult = taskValidator.safeParse({ content, userId });
        if (!validationResult.success) {
            return NextResponse.json(
                { message: validationResult.error.errors[0].message },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }

        const newTask = await prisma.task.create({
            data: { content: content, userId },
            select: { id: true, content: true, completed: true },
        });

        return NextResponse.json({ message: newTask}, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ message: "Error creating task" }, { status: 500 });
    }
}
