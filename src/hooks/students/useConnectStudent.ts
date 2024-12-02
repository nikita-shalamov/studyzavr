import { connectStudent } from "@/services/students/connectStudent.service";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useConnectStudent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const connectStudentFunc = async (
    studentId: string,
    referralCode: string
  ) => {
    setLoading(true);
    setError("");
    try {
      await connectStudent(studentId, referralCode);
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setSuccess(true);
      toast.success("Вы добавлены к учителю!");
      router.push("/student/homework");
    } catch (err: any) {
      setSuccess(false);
      setError(
        err?.response?.data?.message || "Ошибка при подтверждении ученика"
      );
      toast.error("Ошибка при добавлении!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, connectStudentFunc };
};

export default useConnectStudent;
