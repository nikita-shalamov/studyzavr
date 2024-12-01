import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/app/lib/session";

export async function POST(req: Request) {
  const { userId, passwords } = await req.json();
  const { oldPassword, newPassword } = passwords;

  const session = await getSession();
  if (!session || Number(session.userId) !== Number(userId)) {
    return NextResponse.json(
      { message: "Вы не авторизованы!" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не найден!" },
      { status: 404 }
    );
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Старый пароль указан неверно!" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    {
      message: "Пароль успешно изменен!",
    },
    { status: 200 }
  );
}
