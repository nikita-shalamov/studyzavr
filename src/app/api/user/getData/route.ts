import { getSession } from "@/app/lib/session";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = Number(searchParams.get("userId"));

  const session = await getSession();
  if (!session || Number(session.userId) !== Number(userId)) {
    return NextResponse.json(
      { message: "Вы не авторизованы!" },
      { status: 401 }
    );
  }

  if (!userId || isNaN(userId)) {
    return NextResponse.json(
      { message: "Некорректный идентификатор пользователя." },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        image: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Пользователь не найден." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { user, message: "Пользователь найден!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка при выполнении запроса." },
      { status: 500 }
    );
  }
}
