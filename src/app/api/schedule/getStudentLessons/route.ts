import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!userId || !startDate || !endDate) {
    return NextResponse.json(
      { message: "Недостаточно данных для выполнения запроса." },
      { status: 400 }
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return NextResponse.json(
      { message: "Неверный формат дат." },
      { status: 400 }
    );
  }

  try {
    const studentLessons = await prisma.lessons.findMany({
      where: {
        studentId: Number(userId),
        lessonDate: {
          gte: start,
          lte: end,
        },
      },
      include: {
        tutor: {
          select: {
            id: true,
            name: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const lessons = await Promise.all(
      studentLessons.map(async (lesson) => {
        const linkData = await prisma.tutorStudent.findFirst({
          where: {
            tutorId: lesson.tutorId,
            studentId: lesson.studentId,
          },
          select: {
            lessonLink: true,
          },
        });

        return {
          ...lesson,
          lessonLink: linkData?.lessonLink || null,
        };
      })
    );

    return NextResponse.json(
      {
        lessons,
        message: "Уроки успешно найдены!",
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
