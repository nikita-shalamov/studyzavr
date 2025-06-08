import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: true });
  } catch {
    return NextResponse.json(
      { message: false },
      { status: 500 }
    );
  }
}