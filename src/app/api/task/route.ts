import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');

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

        return NextResponse.json({tasks: tasks, status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ message: "Error fetching tasks" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const {content, userId} = await req.json();

    const existingUser = await prisma.user.findUnique({where: {id: userId}});

    if (!existingUser) {
        return NextResponse.json({message: 'User not found'}, {status: 400});
    }

    const newTask = await prisma.task.create({
        data: {content, userId},
        select: {
            id: true,
            content: true,
            completed: true,
        }
    });

    return NextResponse.json({newTask: newTask, status: 201});
}