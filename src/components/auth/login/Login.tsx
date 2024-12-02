"use client";

import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { ILoginData } from "@/types/authData.types";
import AccountType from "../accoutType/AccountType";
import useAuthUser from "@/hooks/user/useAuthUser";
import { redirect } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";

const Login = () => {
  const { loginFunction, error, loading, success } = useAuthUser();
  const setUser = useUserStore((state) => state.setUser);
  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    const res = await loginFunction({
      ...data,
      phoneNumber: data.phoneNumber,
      profileType: selected,
    });
    if (res.user) {
      setUser({ userId: res.user.id, ...res.user });
      redirect(
        res.user.profileType === "student"
          ? "/student/schedule"
          : "/teacher/schedule"
      );
    }
  };

  const [selected, setSelected] = useState<string>("student");

  return (
    <div>
      <AccountType onChange={setSelected} currentValue={selected} />
      <LoginFormComponent
        onSubmit={onSubmit}
        error={error || undefined}
        loading={loading}
        success={success}
        selected={selected}
        changeTypeLink={"/registration"}
      />
    </div>
  );
};

export default Login;
