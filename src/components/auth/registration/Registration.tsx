"use client";

import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { IRegistrationData } from "@/types/authData.types";
import AccountType from "../accoutType/AccountType";
import useAuthUser from "@/hooks/user/useAuthUser";
import { redirect } from "next/navigation";
import RegistrationFormComponent from "../registrationFormComponent/RegistrationFormComponent";

const Registration = () => {
  const { registrationFunction, error, loading, success } = useAuthUser();

  const onSubmit: SubmitHandler<IRegistrationData> = async (data) => {
    const res = await registrationFunction({
      ...data,
      profileType: selected,
    });

    if (res.user.profileType === "student") {
      redirect("/student/homework");
    } else {
      redirect("/teacher/homework");
    }
  };

  const [selected, setSelected] = useState<string>("student");

  return (
    <div>
      <AccountType onChange={setSelected} currentValue={selected} />
      <RegistrationFormComponent
        loading={loading}
        error={error}
        success={success}
        onSubmit={onSubmit}
        selected={selected}
        changeTypeLink={"/login"}
      />
    </div>
  );
};

export default Registration;
