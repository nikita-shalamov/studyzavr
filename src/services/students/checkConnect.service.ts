import axiosInstance from "@/lib/axios";

export const checkConnect = async (referralCode: string, studentId: string) => {
  try {
    const response = await axiosInstance.get("/students/checkConnect", {
      params: { referralCode, studentId },
    });

    return response.data;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(error?.response?.data?.message || "Ошибка во время входа");
  }
};

export default checkConnect;
