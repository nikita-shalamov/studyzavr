import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./app/lib/session";

const studentRoutes = [
  "/student/homework",
  "/student/profile",
  "/student/schedule",
];
const teacherRoutes = [
  "/teacher/homework",
  "/teacher/profile",
  "/teacher/schedule",
  "/teacher/students",
];
const publicRoutes = ["/", "/login", "/registration"];
const authRoutes = ["/login", "/registration"];

const allWays = [...studentRoutes, ...teacherRoutes, ...publicRoutes];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Получаем cookie сессии
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!cookie && !publicRoutes.includes(path) && allWays.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Проверяем доступ в зависимости от профиля
  const profileType = session?.profileType; // student или teacher

  if (profileType && authRoutes.includes(path)) {
    console.log("/${profileType}/homework");

    return NextResponse.redirect(
      new URL(`/${profileType}/homework`, req.nextUrl)
    );
  }

  if (studentRoutes.includes(path) && profileType !== "student") {
    console.log("// Если пользователь не студент");
    // Если пользователь не студент, но пытается получить доступ к маршруту студента
    return NextResponse.redirect(new URL("/teacher/homework", req.nextUrl));
  }

  if (teacherRoutes.includes(path) && profileType !== "teacher") {
    console.log("// Если пользователь не преподаватель", path);
    // Если пользователь не преподаватель, но пытается получить доступ к маршруту преподавателя
    return NextResponse.redirect(new URL("/student/homework", req.nextUrl));
  }

  // Если пользователь прошёл все проверки, доступ разрешён
  return NextResponse.next();
}
