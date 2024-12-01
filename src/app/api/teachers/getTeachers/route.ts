import { getSession } from "@/app/lib/session";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");

  const session = await getSession();
  if (!session || Number(session.userId) !== Number(studentId)) {
    return NextResponse.json(
      { message: "Вы не авторизованы!" },
      { status: 401 }
    );
  }

  if (!studentId) {
    return NextResponse.json(
      { message: "Не указан идентификатор ученика." },
      { status: 400 }
    );
  }

  try {
    const tutors = await prisma.tutorStudent.findMany({
      where: {
        studentId: Number(studentId),
        isConfirmed: true,
      },
      select: {
        tutor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const result = tutors.map(({ tutor }) => tutor);

    return NextResponse.json(
      { teachers: result, message: "Преподаватели успешно найдены!" },
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
