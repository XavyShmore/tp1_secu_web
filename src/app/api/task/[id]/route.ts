import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop()!;
        const { completed } = await req.json();

        const updatedTask = await prisma.task.update({
            where: {id} ,
            data: { completed },
            select: {
                id: true,
                content: true,
                completed: true,
            },
        });

        return NextResponse.json({task: updatedTask, status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while updating task" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop()!;

    if (!id) {
        return NextResponse.json({ message: "ID not provided" }, { status: 400 });
    }

    try {
        await prisma.task.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
    }
}
