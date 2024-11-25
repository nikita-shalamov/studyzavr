import axiosInstance from "@/lib/axios";

export const getMyTeacher = async (referralCode: string) => {
  try {
    const response = await axiosInstance.get("/info/getMyTeacher", {
      params: {
        referralCode,
      },
    });
    return response;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(
      error?.response?.data?.message ||
        "Ошибка во время получения данных учителя"
    );
  }
};
