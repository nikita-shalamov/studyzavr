import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const referralCode = searchParams.get("referralCode");

  if (!referralCode) {
    return NextResponse.json(
      { message: "ReferralCode не предоставлен." },
      { status: 400 }
    );
  }

  try {
    const tutor = await prisma.user.findUnique({
      where: {
        referralCode,
      },
      select: {
        name: true,
        image: true,
      },
    });

    if (!tutor) {
      return NextResponse.json(
        { message: "Преподаватель с данным referralCode не найден." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        tutor,
        message: "Преподаватель успешно найден.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return NextResponse.json(
      { message: "Ошибка при выполнении запроса." },
      { status: 500 }
    );
  }
}
