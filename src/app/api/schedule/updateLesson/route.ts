import { getSession } from "@/app/lib/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { tutorId, lessonId, data } = await req.json();

    const session = await getSession();
    if (!session || Number(session.userId) !== Number(tutorId)) {
      return NextResponse.json(
        { message: "Вы не авторизованы!" },
        { status: 401 }
      );
    }

    const lessonExists = await prisma.lessons.findUnique({
      where: {
        id: Number(lessonId),
        tutorId: Number(tutorId),
      },
    });

    if (!lessonExists) {
      return NextResponse.json({ message: "Урок не найден!" }, { status: 404 });
    }

    const updatedLesson = await prisma.lessons.update({
      where: {
        id: Number(lessonId),
        tutorId: Number(tutorId),
      },
      data: {
        lessonDate: new Date(data.lessonDate),
        studentId: Number(data.studentId),
        lessonWas: data.lessonWas,
      },
    });

    return NextResponse.json(
      { message: "Урок успешно обновлён!", updatedLesson },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при обновлении урока:", error);
    return NextResponse.json(
      { message: "Произошла ошибка при обновлении урока." },
      { status: 500 }
    );
  }
}
