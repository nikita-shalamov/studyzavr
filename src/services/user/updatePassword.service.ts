import axiosInstance from "@/lib/axios";

export const updatePassword = async (
  userId: string,
  passwords: { oldPassword: string; newPassword: string }
) => {
  try {
    const response = await axiosInstance.post("/user/updatePassword", {
      userId,
      passwords,
    });

    return response.data;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(
      error?.response?.data?.message || "Ошибка во время изменения пароля"
    );
  }
};

export default updatePassword;
