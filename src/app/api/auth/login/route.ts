import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";

export async function POST(req: Request) {
  const { phoneNumber, password, profileType, referralCode } = await req.json();

  if (!phoneNumber || !password || !profileType) {
    return NextResponse.json(
      { message: "Телефон, пароль и тип аккаунта это обязательные поля" },
      { status: 404 }
    );
  }

  const profileTypeId = profileType === "student" ? 1 : 2;
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  const user = await prisma.user.findUnique({
    where: {
      phoneNumber_profileTypeId: {
        phoneNumber: formattedPhoneNumber,
        profileTypeId,
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не найден" },
      { status: 404 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: "Неверный пароль" }, { status: 401 });
  }

  if (profileType === "student" && referralCode) {
    const tutor = await prisma.user.findUnique({
      where: { referralCode },
    });

    if (tutor && tutor.profileTypeId === 2) {
      const existingRelation = await prisma.tutorStudent.findUnique({
        where: {
          tutorId_studentId: {
            tutorId: tutor.id,
            studentId: user.id,
          },
        },
      });

      if (!existingRelation) {
        await prisma.tutorStudent.create({
          data: {
            tutorId: tutor.id,
            studentId: user.id,
          },
        });
      }
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
    },
    { status: 200 }
  );
}
