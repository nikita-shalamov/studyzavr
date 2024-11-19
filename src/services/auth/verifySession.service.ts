import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function getUserFromSession() {
  const session = (await cookies()).get("session");

  if (!session) {
    throw new Error("No session found");
  }

  try {
    const { payload } = await jwtVerify(session.value, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log("Failed to verify session:", error);
    throw new Error("Failed to verify session");
  }
}
