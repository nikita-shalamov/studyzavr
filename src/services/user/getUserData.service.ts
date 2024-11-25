import axiosInstance from "@/lib/axios";

const getUserData = async (userId: string) => {
  try {
    const response = await axiosInstance.get("/user/getData", {
      params: {
        userId,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(
      error?.response?.data?.message ||
        "Ошибка во время получения данных пользователя"
    );
  }
};

export default getUserData;
