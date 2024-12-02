import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { referralCode, studentId } = await req.json();

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

  if (existingRelation) {
    return NextResponse.json(
      { message: "Этот ученик уже связан с репетитором" },
      { status: 400 }
    );
  }

  const newRelation = await prisma.tutorStudent.create({
    data: {
      tutorId: existsTutor.id,
      studentId: Number(studentId),
      isConfirmed: false,
    },
  });

  return NextResponse.json(
    {
      newRelation,
      message: "Преподаватель и студент успешно связаны!",
    },
    { status: 201 }
  );
}
