"use client";

import checkConnect from "@/services/students/checkConnect.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useCheckConnect = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const checkConnectFunc = async (referralCode: string, studentId: string) => {
    setLoading(true);
    setError("");
    try {
      const result = await checkConnect(referralCode, studentId);
      if (result.existingRelation) {
        router.push("/student/homework");
      }
      setSuccess(true);
    } catch (err: any) {
      setSuccess(false);
      setError(
        err?.response?.data?.message || "Ошибка при подтверждении ученика"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, checkConnectFunc };
};

export default useCheckConnect;
