import { randomFileName } from "@/helpers/randomFileName";
import { IAddHomework } from "@/types/addHomework.types";

export const addHomework = async (data: IAddHomework) => {
  try {
    const { files, title, text, date, tutorId, studentId } = data;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file.file));
    files.forEach((file) => formData.append("fileNames", file.name));
    files.forEach((file) =>
      formData.append("fileNamesRandom", randomFileName(file.name))
    );
    formData.append("title", title);
    formData.append("text", text);
    formData.append("date", date);
    formData.append("tutorId", tutorId);
    formData.append("studentId", studentId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/homework/addHomework`,
      {
        method: "POST",
        body: formData,
      }
    );

    return response;
  } catch (error: any) {
    console.log("Ошибка загрузки файлов:", error);
    throw new Error(
      error?.response?.data?.message || "Ошибка во время загрузки файлов"
    );
  }
};
