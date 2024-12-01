import { getSession } from "@/app/lib/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { tutorId, studentId, lessonWas, date } = await req.json();

  const session = await getSession();
  if (!session || Number(session.userId) !== Number(tutorId)) {
    return NextResponse.json(
      { message: "Вы не авторизованы!" },
      { status: 401 }
    );
  }

  if (!tutorId || !studentId || !date) {
    return NextResponse.json(
      {
        message: "Id преподавателя, id студента и дата обязательные параметры!",
      },
      { status: 404 }
    );
  }

  const existingRelation = await prisma.tutorStudent.findUnique({
    where: {
      tutorId_studentId: {
        tutorId: Number(tutorId),
        studentId: Number(studentId),
      },
    },
  });

  if (!existingRelation || !existingRelation.isConfirmed) {
    return NextResponse.json(
      { message: "Связь между репетитором и учеником не подтверждена" },
      { status: 400 }
    );
  }

  try {
    const lesson = await prisma.lessons.create({
      data: {
        lessonDate: date,
        tutorId: Number(tutorId),
        studentId: Number(studentId),
        lessonWas: lessonWas ? lessonWas : false,
      },
    });

    return NextResponse.json(
      { lesson, message: "Урок успешно добавлен!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка добавления урока:", error);
    return NextResponse.json({ message: "Ошибка на сервере" }, { status: 500 });
  }
}
