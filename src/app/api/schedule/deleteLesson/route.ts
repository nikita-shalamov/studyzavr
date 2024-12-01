import { getSession } from "@/app/lib/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { lessonId, tutorId } = await req.json();

    const session = await getSession();
    if (!session || Number(session.userId) !== Number(tutorId)) {
      return NextResponse.json(
        { message: "Вы не авторизованы!" },
        { status: 401 }
      );
    }

    const lessonExists = await prisma.lessons.findFirst({
      where: {
        id: Number(lessonId),
        tutorId: Number(tutorId),
      },
    });

    if (!lessonExists) {
      return NextResponse.json(
        { message: "Урок не найден или вы не являетесь его преподавателем!" },
        { status: 404 }
      );
    }

    await prisma.lessons.delete({
      where: {
        id: Number(lessonId),
      },
    });

    return NextResponse.json(
      { message: "Урок успешно удалён!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при удалении урока:", error);
    return NextResponse.json(
      { message: "Произошла ошибка при удалении урока." },
      { status: 500 }
    );
  }
}
