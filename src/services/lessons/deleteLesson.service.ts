import axiosInstance from "@/lib/axios";

export const deleteLesson = async (lessonId: string, tutorId: string) => {
  try {
    const response = await axiosInstance.delete("/schedule/deleteLesson", {
      data: {
        lessonId,
        tutorId,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("Ошибка удаления урока:", error);
    throw new Error(
      error?.response?.data?.message || "Ошибка во время удаления урока"
    );
  }
};
