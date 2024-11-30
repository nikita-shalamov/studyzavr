import updatePassword from "@/services/user/updatePassword.service";
import { useState } from "react";

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const updatePasswordFunc = async (
    userId: string,
    passwords: { oldPassword: string; newPassword: string }
  ) => {
    setLoading(true);
    setError("");
    try {
      await updatePassword(userId, passwords);
      setSuccess(true);
    } catch (err: any) {
      setSuccess(false);
      setError(err.message || "Ошибка при изменении пароля");
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, updatePasswordFunc };
};

export default useUpdatePassword;
