import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import {
  validatePassword,
  validatePhoneNumber,
} from "@/helpers/validateLoginData";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { name, phoneNumber, profileType, password, referralCode } =
    await req.json();

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

  if (existingUser) {
    return NextResponse.json(
      { message: "Такой пользователь уже существует" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newReferralCode = uuidv4();

  const user = await prisma.user.create({
    data: {
      name,
      phoneNumber: formattedPhoneNumber,
      profileTypeId,
      password: hashedPassword,
      referralCode: newReferralCode,
    },
  });

  if (profileType === "student" && referralCode) {
    const tutor = await prisma.user.findUnique({
      where: { referralCode },
    });

    if (tutor && tutor.profileTypeId === 2) {
      await prisma.tutorStudent.create({
        data: {
          tutorId: tutor.id,
          studentId: user.id,
          isConfirmed: true,
        },
      });
    }
  }

  return NextResponse.json(
    {
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        profileType,
        name: user.name,
        referralCode: user.referralCode,
      },
      message: "Пользователь успешно создан!",
    },
    { status: 200 }
  );
}
