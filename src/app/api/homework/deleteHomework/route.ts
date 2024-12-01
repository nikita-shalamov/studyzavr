import { getSession } from "@/app/lib/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { studentId, tutorId, homeworkId } = await req.json();

    const session = await getSession();
    if (!session || Number(session.userId) !== Number(tutorId)) {
      return NextResponse.json(
        { message: "Вы не авторизованы!" },
        { status: 401 }
      );
    }

    const homeworkExists = await prisma.homework.findFirst({
      where: {
        id: Number(homeworkId),
        tutorId: Number(tutorId),
        studentId: Number(studentId),
      },
    });

    if (!homeworkExists) {
      return NextResponse.json(
        {
          message: "Домашнее задание не найдено!",
        },
        { status: 404 }
      );
    }

    await prisma.homework.delete({
      where: {
        id: Number(homeworkId),
      },
    });

    return NextResponse.json(
      { message: "Домашнее задание успешно удалено!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при удалении домашнего задания:", error);
    return NextResponse.json(
      { message: "Произошла ошибка при удалении домашнего задания." },
      { status: 500 }
    );
  }
}
