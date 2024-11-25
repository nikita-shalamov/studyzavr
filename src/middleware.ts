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

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!cookie && !publicRoutes.includes(path) && allWays.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const profileType = session?.profileType;

  if (profileType && authRoutes.includes(path)) {
    return NextResponse.redirect(
      new URL(`/${profileType}/homework`, req.nextUrl)
    );
  }

  if (studentRoutes.includes(path) && profileType !== "student") {
    return NextResponse.redirect(new URL("/teacher/homework", req.nextUrl));
  }

  if (teacherRoutes.includes(path) && profileType !== "teacher") {
    return NextResponse.redirect(new URL("/student/homework", req.nextUrl));
  }

  return NextResponse.next();
}
