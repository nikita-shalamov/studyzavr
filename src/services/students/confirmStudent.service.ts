import axiosInstance from "@/lib/axios";

export const confirmStudent = async (tutorId: string, studentId: string) => {
  try {
    const response = await axiosInstance.post("/students/confirmStudent", {
      tutorId,
      studentId,
    });

    return response.data;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(error?.response?.data?.message || "Ошибка во время входа");
  }
};

export default confirmStudent;
