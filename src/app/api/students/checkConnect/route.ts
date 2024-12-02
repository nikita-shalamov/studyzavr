import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const referralCode = searchParams.get("referralCode");
  const studentId = searchParams.get("studentId");

  if (!referralCode || !studentId) {
    return NextResponse.json(
      {
        message: "Не все данные переданы!",
      },
      { status: 400 }
    );
  }

  const existsStudent = await prisma.user.findUnique({
    where: {
      id: Number(studentId),
      profileTypeId: 1,
    },
  });

  const existsTutor = await prisma.user.findUnique({
    where: {
      referralCode,
      profileTypeId: 2,
    },
  });

  if (!existsStudent || !existsTutor) {
    return NextResponse.json(
      {
        message: "Студент или преподаватель не найден!",
      },
      { status: 400 }
    );
  }

  const existingRelation = await prisma.tutorStudent.findUnique({
    where: {
      tutorId_studentId: {
        tutorId: existsTutor.id,
        studentId: Number(studentId),
      },
    },
  });

  return NextResponse.json(
    {
      existingRelation: !!existingRelation,
      message: "Студенты успешно найдены!",
    },
    { status: 201 }
  );
}
