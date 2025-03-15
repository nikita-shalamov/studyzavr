import { NextResponse } from "next/server";
import { createReadStream, statSync, existsSync } from "fs";
import { join } from "path";
import { getSession } from "@/app/lib/session";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fileName = url.searchParams.get("file");
    const originalName = url.searchParams.get("originalName");

    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { message: "Нет доступа к запросу!" },
        { status: 401 }
      );
    }

    if (!fileName) {
      return NextResponse.json({ message: "Файл не указан" }, { status: 400 });
    }

    const filePath = join(process.cwd(), "files", "uploads2345", fileName);

    // Проверяем существование файла
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { message: "Файл не найден" },
        { status: 404 }
      );
    }

    const stat = statSync(filePath);
    const fileSize = stat.size;
    
    // Проверяем размер файла
    if (fileSize === 0) {
      return NextResponse.json(
        { message: "Файл пуст" },
        { status: 400 }
      );
    }

    const stream = createReadStream(filePath);

    const headers = new Headers();
    headers.set("Content-Type", "application/octet-stream");
    
    // Кодируем имя файла для поддержки кириллицы
    const encodedFilename = encodeURIComponent(originalName || fileName);
    headers.set(
      "Content-Disposition", 
      `attachment; filename*=UTF-8''${encodedFilename}`
    );
    headers.set("Content-Length", fileSize.toString());
    
    // Добавляем заголовки кэширования
    headers.set("Cache-Control", "public, max-age=3600"); // Кэшировать на 1 час
    headers.set("Last-Modified", stat.mtime.toUTCString());

    // Обработка условного GET запроса
    const ifModifiedSince = req.headers.get("if-modified-since");
    if (ifModifiedSince && new Date(ifModifiedSince) >= stat.mtime) {
      return new Response(null, { status: 304 }); // Not Modified
    }

    return new Response(stream as unknown as ReadableStream, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Ошибка при скачивании файла:", error);
    
    // Более детальная обработка ошибок
    if (error instanceof Error) {
      if (error.message.includes("ENOENT")) {
        return NextResponse.json(
          { message: "Файл не найден" },
          { status: 404 }
        );
      }
      if (error.message.includes("EACCES")) {
        return NextResponse.json(
          { message: "Нет доступа к файлу" },
          { status: 403 }
        );
      }
    }
    
    return NextResponse.json(
      { message: "Ошибка при скачивании файла" },
      { status: 500 }
    );
  }
}
