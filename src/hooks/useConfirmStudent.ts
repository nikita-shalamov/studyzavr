import confirmStudent from "@/services/students/confirmStudent.service";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useConfirmStudent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const confirm = async (tutorId: string, studentId: string) => {
    setLoading(true);
    setError("");
    try {
      await confirmStudent(tutorId, studentId);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["noneConfirmedStudents"] });
    } catch (err: any) {
      setSuccess(false);
      setError(
        err?.response?.data?.message || "Ошибка при подтверждении ученика"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, confirm };
};

export default useConfirmStudent;
