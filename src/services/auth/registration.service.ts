import { createSession } from "@/app/lib/session";
import axios from "@/lib/axios";
import { IRegistrationData } from "@/types/authData.types";

const registration = async (data: IRegistrationData) => {
  try {
    const response = await axios.post("/auth/registration", data);
    if (response.status === 200) {
      await createSession({
        ...response.data.user,
        userId: String(response.data.user.id),
      });
    }
    return response.data;
  } catch (err: any) {
    console.log("Service error:", err);
    throw new Error(
      err?.response?.data?.message || "Ошибка во время регистрации"
    );
  }
};

export default registration;
