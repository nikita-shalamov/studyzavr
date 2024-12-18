import { getSession } from "@/app/lib/session";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tutorId = searchParams.get("tutorId");

  const session = await getSession();
  if (!session || Number(session.userId) !== Number(tutorId)) {
    return NextResponse.json(
      { message: "Вы не авторизованы!" },
      { status: 401 }
    );
  }

  const students = await prisma.tutorStudent.findMany({
    where: {
      tutorId: Number(tutorId),
      isConfirmed: false,
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          phoneNumber: true,
        },
      },
    },
  });
  return NextResponse.json(
    {
      students,
      message: "Неподтвержденные студенты успешно найдены!",
    },
    { status: 201 }
  );
}
