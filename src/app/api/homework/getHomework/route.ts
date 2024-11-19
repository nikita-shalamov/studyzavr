import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tutorId = url.searchParams.get("tutorId");
    const studentId = url.searchParams.get("studentId");

    if (!tutorId && !studentId) {
      return NextResponse.json(
        { message: "Необходимо указать tutorId или studentId" },
        { status: 400 }
      );
    }

    const filter: any = {};
    if (tutorId) filter.tutorId = Number(tutorId);
    if (studentId) filter.studentId = Number(studentId);

    const homework = await prisma.homework.findMany({
      where: filter,
      orderBy: [
        { date: "desc" }, // Сортировка по дате
        { createdAt: "desc" }, // Сортировка по createdAt внутри одинаковых значений date
      ],
    });

    return NextResponse.json({ homework }, { status: 200 });
  } catch (error) {
    console.error("Ошибка получения домашнего задания:", error);
    return NextResponse.json({ message: "Ошибка на сервере" }, { status: 500 });
  }
}
