import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fileName = url.searchParams.get("file");

    if (!fileName) {
      return NextResponse.json({ message: "Файл не указан" }, { status: 400 });
    }

    const filePath = join(process.cwd(), "files", "uploads2345", fileName); // Путь к файлу

    // Читаем файл
    const fileBuffer = await readFile(filePath);

    // Определяем тип контента (например, для изображений или других типов)
    const mimeType = "application/octet-stream"; // Для универсальных файлов

    // Отправляем файл пользователю
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Ошибка при скачивании файла:", error);
    return NextResponse.json({ message: "Ошибка на сервере" }, { status: 500 });
  }
}