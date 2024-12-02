"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/app/lib/session";
import useCheckConnect from "../students/useCheckConnect";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { JWTPayload } from "jose";

const useCheckSession = (referralCode: string) => {
  const [payload, setPayload] = useState<null | JWTPayload>(null);
  const [loading, setLoading] = useState(false);
  const { checkConnectFunc } = useCheckConnect();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const payload = await getSession();
        if (payload) {
          if (payload.profileType === "teacher") {
            router.push("/teacher/schedule");
            toast.error("Вы являетесь преподавателем!");
            return;
          }
          setPayload(payload);
          checkConnectFunc(referralCode, payload.userId as string);
        }
      } catch (error) {
        console.log("Failed to verify session:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { loading, payload };
};

export default useCheckSession;
