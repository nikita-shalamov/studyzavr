import axiosInstance from "@/lib/axios";

const getData = async (userId: string) => {
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

export default getData;
