import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tutorId = Number(searchParams.get("tutorId"));
  const studentId = Number(searchParams.get("studentId"));

  if (!tutorId || isNaN(tutorId) || !studentId || isNaN(studentId)) {
    return NextResponse.json(
      { message: "Некорректные идентификаторы преподавателя или ученика." },
      { status: 400 }
    );
  }

  try {
    const tutorStudent = await prisma.tutorStudent.findUnique({
      where: {
        tutorId_studentId: {
          tutorId: Number(tutorId),
          studentId: Number(studentId),
        },
      },
    });

    if (!tutorStudent || !tutorStudent.isConfirmed) {
      return NextResponse.json(
        { message: "Запись о связи преподавателя и ученика неподтверждена." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        lessonLink: tutorStudent.lessonLink,
        message: "Ссылка на урок найдена.",
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
