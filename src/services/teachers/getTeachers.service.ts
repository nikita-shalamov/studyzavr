import axiosInstance from "@/lib/axios";

export const getTeachers = async (studentId: string) => {
  try {
    const response = await axiosInstance.get("/teachers/getTeachers", {
      params: {
        studentId,
      },
    });
    return response;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(error?.response?.data?.message || "Ошибка во время входа");
  }
};
