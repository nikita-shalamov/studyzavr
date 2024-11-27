"use server";

import { ILoginData } from "@/types/authData.types";
import { createSession } from "@/app/lib/session";
import axios from "@/lib/axios";

const login = async (data: ILoginData) => {
  try {
    const response = await axios.post("/auth/login", data);
    console.log("my response", response.data);

    if (response.status === 200) {
      await createSession({
        ...response.data.user,
        userId: String(response.data.user.id),
      });
    }
    return response.data;
  } catch (err: any) {
    console.log("Service error:", err);
    throw new Error(err?.response?.data?.message || "Ошибка во время входа");
  }
};

export default login;
