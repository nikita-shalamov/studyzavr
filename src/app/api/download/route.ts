import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { getSession } from "@/app/lib/session";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fileName = url.searchParams.get("file");

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

    const fileBuffer = await readFile(filePath);

    const mimeType = "application/octet-stream";

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
