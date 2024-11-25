import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { lessonId, data } = await req.json();

    const lessonExists = await prisma.lessons.findUnique({
      where: {
        id: Number(lessonId),
      },
    });

    if (!lessonExists) {
      return NextResponse.json({ message: "Урок не найден!" }, { status: 404 });
    }

    const updatedLesson = await prisma.lessons.update({
      where: {
        id: Number(lessonId),
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
