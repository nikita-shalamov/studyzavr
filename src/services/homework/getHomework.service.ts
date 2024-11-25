import axiosInstance from "@/lib/axios";
const getHomework = async (tutorId: string, studentId: string) => {
  try {
    const response = await axiosInstance.get("/homework/getHomework", {
      params: {
        tutorId,
        studentId,
      },
    });

    return response;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(error?.response?.data?.message || "Ошибка во время входа");
  }
};

export default getHomework;
