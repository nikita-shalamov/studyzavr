import axiosInstance from "@/lib/axios";

const getLink = async (studentId: string, tutorId: string) => {
  try {
    const response = await axiosInstance.get("/user/getLink", {
      params: {
        studentId,
        tutorId,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log("Service error:", error);
    throw new Error(
      error?.response?.data?.message || "Ошибка во получения ссылки на урок"
    );
  }
};

export default getLink;
