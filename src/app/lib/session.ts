"use server";

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { IUser } from "@/types/user.types";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(data: IUser) {
  const { userId, name, phoneNumber, profileType, referralCode } = data;
  const expiresAt = new Date(Date.now() + 3650 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    userId,
    expiresAt,
    name,
    phoneNumber,
    profileType,
    referralCode,
  });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
  name: string;
  phoneNumber: string;
  profileType: string;
  referralCode: string;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3650d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: any) {
    console.log(error);
    console.log("Failed to verify session");
  }
}

export async function getSession() {
  const session = (await cookies()).get("session");

  if (!session) {
    throw new Error("No session found");
  }

  const { payload } = await jwtVerify(session.value, encodedKey, {
    algorithms: ["HS256"],
  });

  return payload;
}
