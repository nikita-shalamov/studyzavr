import { getSession } from "@/app/lib/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { tutorId, studentId } = await req.json();

  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: "Вы не авторизованы!" },
      { status: 401 }
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

  if (!existingRelation) {
    return NextResponse.json(
      { message: "Связь между репетитором и учеником не найдена" },
      { status: 404 }
    );
  }

  if (existingRelation.isConfirmed) {
    return NextResponse.json(
      { message: "Этот ученик уже подтвержден" },
      { status: 400 }
    );
  }

  const updatedRelation = await prisma.tutorStudent.update({
    where: {
      tutorId_studentId: {
        tutorId: Number(tutorId),
        studentId: Number(studentId),
      },
    },
    data: {
      isConfirmed: true,
    },
  });

  return NextResponse.json(
    {
      updatedRelation,
      message: "Ученик успешно подтвержден!",
    },
    { status: 200 }
  );
}
