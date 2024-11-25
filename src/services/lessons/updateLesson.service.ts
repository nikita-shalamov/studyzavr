import axiosInstance from "@/lib/axios";

export const updateLesson = async (
  lessonId: string,
  tutorId: string,
  data: { lessonDate?: string; lessonWas?: boolean; studentId?: string }
) => {
  try {
    const response = await axiosInstance.patch("/schedule/updateLesson", {
      lessonId,
      tutorId,
      data,
    });

    return response.data;
  } catch (error: any) {
    console.log("Ошибка при изменении урока:", error);
    throw new Error(
      error?.response?.data?.message || "Ошибка во время изменения урока"
    );
  }
};
