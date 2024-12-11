import { NextResponse } from "next/server";
import { createReadStream, statSync } from "fs";
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

    const stat = statSync(filePath);
    const fileSize = stat.size;
    const stream = createReadStream(filePath);

    const headers = new Headers();
    headers.set("Content-Type", "application/octet-stream");
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`);
    headers.set("Content-Length", fileSize.toString());

    return new NextResponse(stream as any, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Ошибка при скачивании файла:", error);
    return NextResponse.json({ message: "Ошибка на сервере" }, { status: 500 });
  }
}
