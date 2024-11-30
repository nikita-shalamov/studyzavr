import removeStudent from "@/services/students/removeStudent.service";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useRemoveStudent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const remove = async (tutorId: string, studentId: string) => {
    setLoading(true);
    setError("");
    try {
      await removeStudent(tutorId, studentId);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["noneConfirmedStudents"] });
    } catch (err: any) {
      setSuccess(false);
      setError(err?.response?.data?.message || "Ошибка при удалении ученика");
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, remove };
};

export default useRemoveStudent;
