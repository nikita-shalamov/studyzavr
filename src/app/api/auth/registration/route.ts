import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import {
  validatePassword,
  validatePhoneNumber,
} from "@/helpers/validateLoginData";

export async function POST(req: Request) {
  const { name, phoneNumber, profileType, password } = await req.json();

  console.log({ name, phoneNumber, profileType, password });

  if (!["student", "teacher"].includes(profileType)) {
    return NextResponse.json(
      { message: "Укажите тип профиля" },
      { status: 400 }
    );
  }

  if (!phoneNumber || !password || !name) {
    return NextResponse.json(
      { message: "Укажите имя, телефон и пароль" },
      { status: 400 }
    );
  }

  if (validatePhoneNumber(phoneNumber) !== true) {
    return NextResponse.json(
      { message: "Формат телефона неверный" },
      { status: 400 }
    );
  }

  if (validatePassword(password) !== true) {
    return NextResponse.json(
      { message: "Формат пароля неверный" },
      { status: 400 }
    );
  }

  const profileTypeId = profileType === "student" ? 1 : 2;

  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  const existingUser = await prisma.user.findUnique({
    where: {
      phoneNumber_profileTypeId: {
        phoneNumber: formattedPhoneNumber,
        profileTypeId,
      },
    },
  });

  console.log(existingUser, formattedPhoneNumber, profileTypeId);

  if (existingUser) {
    return NextResponse.json(
      { message: "Такой пользователь уже существует" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log({
    data: {
      name,
      phoneNumber: formattedPhoneNumber,
      profileTypeId,
      password: hashedPassword,
    },
  });

  const user = await prisma.user.create({
    data: {
      name,
      phoneNumber: formattedPhoneNumber,
      profileTypeId,
      password: hashedPassword,
    },
  });
  return NextResponse.json(
    {
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        profileType,
        name: user.name,
      },
      message: "Пользователь успешно создан!",
    },
    { status: 200 }
  );
}
