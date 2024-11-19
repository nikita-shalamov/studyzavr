import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { tutorId, studentId } = await req.json();

  const existsStudent = await prisma.user.findUnique({
    where: {
      id: Number(studentId),
      profileTypeId: 1,
    },
  });

  const existsTutor = await prisma.user.findUnique({
    where: {
      id: Number(tutorId),
      profileTypeId: 2,
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

  if (!existsTutor) {
    return NextResponse.json(
      {
        message: "Преподаватель не найден!",
      },
      { status: 400 }
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

  if (existingRelation) {
    return NextResponse.json(
      { message: "Этот ученик уже связан с репетитором" },
      { status: 400 }
    );
  }

  const newRelation = await prisma.tutorStudent.create({
    data: {
      tutorId: Number(tutorId),
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
