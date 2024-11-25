"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { getSession } from "@/app/lib/session";

const useUserSetData = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const setError = useUserStore((state) => state.setError);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const payload = await getSession();

        setUser({
          userId: payload.userId as string,
          name: payload.name as string,
          phoneNumber: payload.phoneNumber as string,
          profileType: payload.profileType as string,
        });
      } catch (error) {
        setError("Failed to verify session");
        console.error("Failed to verify session:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, []);
};

export default useUserSetData;
