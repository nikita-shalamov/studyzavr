import login from "@/services/auth/login.service";
import registration from "@/services/auth/registration.service";
import { ILoginData, IRegistrationData } from "@/types/authData.types";
import { useState } from "react";

const useAuthUser = () => {
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const registrationFunction = async (inputData: IRegistrationData) => {
    if (status.success) return;

    setStatus({ loading: true, error: null, success: false });

    try {
      const responseData = await registration(inputData);
      setStatus({ loading: false, error: null, success: true });
      return responseData;
    } catch (err: any) {
      console.log("useRegistrationUser error:", err);
      setStatus({ loading: false, error: err.message, success: false });
      return { error: err };
    }
  };

  const loginFunction = async (inputData: ILoginData) => {
    if (status.success) return;

    setStatus({ ...status, loading: true, success: false });

    try {
      const responseData = await login(inputData);
      setStatus({ loading: false, error: null, success: true });
      return responseData;
    } catch (err: any) {
      console.log("useLoginUser error:", err);
      setStatus({ loading: false, error: err.message, success: false });
      return { error: err };
    }
  };

  return {
    loginFunction,
    registrationFunction,
    loading: status.loading,
    error: status.error,
    success: status.success,
  };
};

export default useAuthUser;
