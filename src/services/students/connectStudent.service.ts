import axiosInstance from "@/lib/axios";

export const connectStudent = async (
  studentId: string,
  referralCode: string
) => {
  try {
    const response = await axiosInstance.post("/students/connectStudent", {
      studentId,
      referralCode,
    });

    return response.data;
  } catch (error: any) {
    console.log("Ошибка добавления ученика:", error);
    throw new Error(
      error?.response?.data?.message || "Ошибка во время добавления ученика"
    );
  }
};
