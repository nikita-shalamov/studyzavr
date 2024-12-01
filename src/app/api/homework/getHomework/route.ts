import { getSession } from "@/app/lib/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tutorId = url.searchParams.get("tutorId");
    const studentId = url.searchParams.get("studentId");

    const session = await getSession();
    if (
      !session ||
      (Number(session.userId) !== Number(studentId) &&
        Number(session.userId) !== Number(tutorId))
    ) {
      return NextResponse.json(
        { message: "Нет доступа к запросу!" },
        { status: 401 }
      );
    }

    if (!tutorId && !studentId) {
      return NextResponse.json(
        { message: "Необходимо указать все данные" },
        { status: 400 }
      );
    }

    const homework = await prisma.homework.findMany({
      where: { tutorId: Number(tutorId), studentId: Number(studentId) },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ homework }, { status: 200 });
  } catch (error: any) {
    console.error("Ошибка получения домашнего задания:", error);
    return NextResponse.json(
      { message: error?.message || "Ошибка на сервере" },
      { status: 500 }
    );
  }
}
