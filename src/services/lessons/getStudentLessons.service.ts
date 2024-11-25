import axiosInstance from "@/lib/axios";

const getStudentLessons = async (
  userId: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axiosInstance.get("/schedule/getStudentLessons", {
      params: {
        userId,
        startDate,
        endDate,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(
      error?.response?.data?.message || "Ошибка во получения расписания ученика"
    );
  }
};

export default getStudentLessons;
