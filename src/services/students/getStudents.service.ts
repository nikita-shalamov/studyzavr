import axiosInstance from "@/lib/axios";

export const getStudents = async (tutorId: string) => {
  try {
    const response = await axiosInstance.get("/students/getStudents", {
      params: {
        tutorId,
      },
    });
    return response;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(error?.response?.data?.message || "Ошибка во время входа");
  }
};
