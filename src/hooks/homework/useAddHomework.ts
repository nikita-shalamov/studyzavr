import { addHomework } from "@/services/homework/addHomework.service";
import { IAddHomework } from "@/types/addHomework.types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const useAddHomework = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const addHomeworkFunc = async (data: IAddHomework) => {
    setLoading(true);
    setError("");
    try {
      await addHomework(data);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["homeworkStudent"] });
      toast.success("Домашнее задание успешно загружено!");
    } catch (err: any) {
      setSuccess(false);
      setError(
        err?.response?.data?.message ||
          "Ошибка при добавлении домашнего задания"
      );
      toast.error("Ошибка при добавлении домашнего задания!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, addHomeworkFunc };
};

export default useAddHomework;
