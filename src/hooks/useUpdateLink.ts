import { updateLink } from "@/services/lessons/updateLink.service";
import { toast } from "react-toastify";

const useUpdateLink = () => {
  const updateLinkFunc = async (
    studentId: string,
    tutorId: string,
    lessonLink: string | null
  ) => {
    try {
      await updateLink(studentId, tutorId, lessonLink);
      toast.success("Ссылка успешно изменена!");
    } catch (err: any) {
      toast.error(err.message || "Ошибка при измненении ссылки!");
    }
  };

  return { updateLinkFunc };
};

export default useUpdateLink;
