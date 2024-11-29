import { deleteHomework } from "@/services/homework/deleteHomework.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteHomework = () => {
  const queryClient = useQueryClient();

  const deleteHomeworkFunc = async (
    studentId: string,
    tutorId: string,
    homeworkId: string
  ) => {
    try {
      await deleteHomework(studentId, tutorId, homeworkId);
      queryClient.invalidateQueries({
        queryKey: ["homeworkStudent", tutorId, studentId],
      });
      toast.success("Домашнее задание успешно удалено!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return { deleteHomeworkFunc };
};

export default useDeleteHomework;
