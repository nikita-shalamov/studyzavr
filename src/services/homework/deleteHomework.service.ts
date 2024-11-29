import axiosInstance from "@/lib/axios";

export const deleteHomework = async (
  studentId: string,
  tutorId: string,
  homeworkId: string
) => {
  try {
    const response = await axiosInstance.delete("/homework/deleteHomework", {
      data: {
        studentId,
        tutorId,
        homeworkId,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("Ошибка удаления домашнего задания:", error);
    throw new Error(
      error?.response?.data?.message ||
        "Ошибка во время удаления домашнего задания"
    );
  }
};
