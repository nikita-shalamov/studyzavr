import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, data } = await req.json();

  const userExists = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!userExists) {
    return NextResponse.json(
      { message: "Пользователь не найден!" },
      { status: 404 }
    );
  }

  const updatedData = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json(
    {
      updatedData,
      message: "Данные успешно изменены!",
    },
    { status: 200 }
  );
}
