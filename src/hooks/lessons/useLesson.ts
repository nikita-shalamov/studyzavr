import { deleteLesson } from "@/services/lessons/deleteLesson.service";
import { updateLesson } from "@/services/lessons/updateLesson.service";
import { useUserStore } from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useLesson = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const deleteLessonFunc = async (lessonId: string, tutorId: string) => {
    try {
      await deleteLesson(lessonId, tutorId);
      queryClient.invalidateQueries({ queryKey: ["lessons", user?.userId] });
      toast.success("Урок успешно удален!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const updateLessonFunc = async (
    lessonId: string,
    tutorId: string,
    data: { lessonDate?: string; lessonWas?: boolean; studentId?: string }
  ) => {
    try {
      await updateLesson(lessonId, tutorId, data);
      queryClient.invalidateQueries({ queryKey: ["lessons", user?.userId] });
      toast.success("Урок успешно изменен!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return { deleteLessonFunc, updateLessonFunc };
};

export default useLesson;
