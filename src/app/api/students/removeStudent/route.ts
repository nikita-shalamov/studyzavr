import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { tutorId, studentId } = await req.json();

  console.log("tutorId, studentId", tutorId, studentId);

  // Проверка существования ученика
  const existsStudent = await prisma.user.findUnique({
    where: {
      id: Number(studentId),
      profileTypeId: 1, // Убедимся, что это студент
    },
  });

  if (!existsStudent) {
    return NextResponse.json(
      {
        message: "Студент не найден!",
      },
      { status: 400 }
    );
  }

  // Проверка существования репетитора
  const existsTutor = await prisma.user.findUnique({
    where: {
      id: Number(tutorId),
      profileTypeId: 2, // Убедимся, что это репетитор
    },
  });

  if (!existsTutor) {
    return NextResponse.json(
      {
        message: "Преподаватель не найден!",
      },
      { status: 400 }
    );
  }

  // Проверка существующей связи
  const existingRelation = await prisma.tutorStudent.findUnique({
    where: {
      tutorId_studentId: {
        tutorId: Number(tutorId),
        studentId: Number(studentId),
      },
    },
  });

  if (!existingRelation) {
    return NextResponse.json(
      {
        message: "Связь между этим репетитором и студентом не найдена!",
      },
      { status: 400 }
    );
  }

  // Удаление связи
  await prisma.tutorStudent.delete({
    where: {
      tutorId_studentId: {
        tutorId: Number(tutorId),
        studentId: Number(studentId),
      },
    },
  });

  return NextResponse.json(
    {
      message: "Связь между репетитором и студентом успешно удалена!",
    },
    { status: 200 }
  );
}
