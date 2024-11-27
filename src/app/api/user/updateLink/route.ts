import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { studentId, tutorId, lessonLink } = await req.json();

  if (!tutorId || isNaN(tutorId) || !studentId || isNaN(studentId)) {
    return NextResponse.json(
      { message: "Некорректные идентификаторы преподавателя или ученика." },
      { status: 400 }
    );
  }

  try {
    const tutorStudentExists = await prisma.tutorStudent.findUnique({
      where: {
        tutorId_studentId: {
          tutorId: Number(tutorId),
          studentId: Number(studentId),
        },
      },
    });

    if (!tutorStudentExists || !tutorStudentExists.isConfirmed) {
      return NextResponse.json(
        {
          message:
            "Запись о связи преподавателя и ученика не найдена или неподтверждена.",
        },
        { status: 404 }
      );
    }

    const tutorStudent = await prisma.tutorStudent.update({
      where: {
        tutorId_studentId: {
          tutorId: Number(tutorId),
          studentId: Number(studentId),
        },
      },
      data: {
        lessonLink,
      },
    });

    return NextResponse.json(
      {
        lessonLink: tutorStudent.lessonLink,
        message: "Ссылка на урок обновлена.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка при выполнении запроса." },
      { status: 500 }
    );
  }
}
