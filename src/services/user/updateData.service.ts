import axiosInstance from "@/lib/axios";

export const updateData = async (
  userId: string,
  data: { name: string; image: string | null }
) => {
  try {
    const response = await axiosInstance.post("/user/updateData", {
      userId,
      data,
    });

    return response.data;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(
      error?.response?.data?.message ||
        "Ошибка во время изменения данных пользователя"
    );
  }
};

export default updateData;
