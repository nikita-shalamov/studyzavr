import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];
    const fileNames = formData.getAll("fileNames") as string[];
    const fileRandomNames = formData.getAll("fileNamesRandom") as string[];
    const title = formData.get("title") as string;
    const text = formData.get("text") as string;
    const date = formData.get("date");
    const tutorId = formData.get("tutorId");
    const studentId = formData.get("studentId");

    const folder = "uploads2345";
    const uploadDir = join(process.cwd(), "files", folder);
    await mkdir(uploadDir, { recursive: true });

    const existingRelation = await prisma.tutorStudent.findUnique({
      where: {
        tutorId_studentId: {
          tutorId: Number(tutorId),
          studentId: Number(studentId),
        },
      },
    });

    if (!existingRelation || !existingRelation.isConfirmed) {
      return NextResponse.json(
        { message: "Связь между репетитором и учеником не подтверждена" },
        { status: 400 }
      );
    }

    const homework = await prisma.homework.create({
      data: {
        title,
        text,
        date: new Date(date as string),
        fileNames,
        fileRandomNames,
        tutorId: Number(tutorId),
        studentId: Number(studentId),
      },
    });

    await Promise.all(
      files.map(async (file, index) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = join(uploadDir, fileRandomNames[index]);
        await writeFile(filePath, buffer);
        return `/${folder}/${fileRandomNames[index]}`;
      })
    );

    return NextResponse.json(
      { homework, message: "Домашнее задание успешно добавлено!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка добавления домашнего задания:", error);
    return NextResponse.json({ message: "Ошибка на сервере" }, { status: 500 });
  }
}
