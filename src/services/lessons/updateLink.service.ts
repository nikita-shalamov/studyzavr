import axiosInstance from "@/lib/axios";

export const updateLink = async (
  studentId: string,
  tutorId: string,
  lessonLink: string | null
) => {
  try {
    const response = await axiosInstance.post("/user/updateLink", {
      studentId,
      tutorId,
      lessonLink,
    });

    return response.data;
  } catch (error: any) {
    console.log("Ошибка при изменении ссылки:", error);
    throw new Error(
      error?.response?.data?.message || "Ошибка во время изменения ссылки"
    );
  }
};
