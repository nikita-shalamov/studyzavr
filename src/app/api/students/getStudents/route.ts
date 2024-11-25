import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tutorId = searchParams.get("tutorId");

  const students = await prisma.tutorStudent.findMany({
    where: {
      tutorId: Number(tutorId),
      isConfirmed: true,
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return NextResponse.json(
    {
      students,
      message: "Студенты успешно найдены!",
    },
    { status: 201 }
  );
}
