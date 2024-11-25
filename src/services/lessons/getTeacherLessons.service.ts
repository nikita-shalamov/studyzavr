import axiosInstance from "@/lib/axios";

const getTeacherLessons = async (
  tutorId: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axiosInstance.get("/schedule/getTeacherLessons", {
      params: {
        tutorId,
        startDate,
        endDate,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(
      error?.response?.data?.message ||
        "Ошибка во время получения расписания учителя"
    );
  }
};

export default getTeacherLessons;
