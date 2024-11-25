import axiosInstance from "@/lib/axios";

export const getNoneConfirmedStudents = async (tutorId: string) => {
  try {
    const response = await axiosInstance.get(
      "/students/getNoneConfirmedStudents",
      {
        params: {
          tutorId,
        },
      }
    );

    return response;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(error?.response?.data?.message || "Ошибка во время входа");
  }
};
