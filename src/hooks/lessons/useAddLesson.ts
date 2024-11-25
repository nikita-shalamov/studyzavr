import { addLesson } from "@/services/lessons/addLesson.service";
import { useUserStore } from "@/store/useUserStore";
import { IAddLesson } from "@/types/addLesson.types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const useAddLesson = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const addLessonFunc = async (data: IAddLesson) => {
    setLoading(true);
    setError("");
    try {
      await addLesson(data);
      queryClient.invalidateQueries({ queryKey: ["lessons", user?.userId] });
      toast.success("Урок успешно добавлен!");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Ошибка при добавлении урока");
      toast.error("Ошибка при добавлении урока!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, addLessonFunc };
};

export default useAddLesson;
