import axiosInstance from "@/lib/axios";
import { IAddLesson } from "@/types/addLesson.types";

export const addLesson = async (data: IAddLesson) => {
  try {
    const { date, tutorId, studentId } = data;

    const response = await axiosInstance.post("/schedule/addLesson", {
      date,
      tutorId,
      studentId,
    });

    return response.data;
  } catch (error: any) {
    console.log("Ошибка добавления урока:", error);
    throw new Error(
      error?.response?.data?.message || "Ошибка во время добавления урока"
    );
  }
};
