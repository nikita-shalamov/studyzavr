"use client";

import { SubmitHandler } from "react-hook-form";
import { IRegistrationData } from "@/types/authData.types";
import useAuthUser from "@/hooks/user/useAuthUser";
import { useParams, useRouter } from "next/navigation";
import useGetMyTeacher from "@/hooks/teachers/useGetMyTeacher";
import YourTeacher from "@/components/yourTeacher/YourTeacher";
import Spinner from "@/components/loader/Spinner";
import { useUserStore } from "@/store/useUserStore";
import FindTeacherError from "../findTeacherError/FindTeacherError";
import RegistrationFormComponent from "../registrationFormComponent/RegistrationFormComponent";
import CurrentAccount from "../currentAccount/CurrentAccount";
import useConnectStudent from "@/hooks/students/useConnectStudent";
import useCheckSession from "@/hooks/user/useCheckSession";

const RegistrationRef = () => {
  const slug = useParams();
  const { payload, loading: loadingCheckSession } = useCheckSession(
    slug?.teacherLink as string
  );
  const router = useRouter();
  const { connectStudentFunc } = useConnectStudent();
  const {
    data: tutor,
    isLoading: tutorLoading,
    error: errorUse,
  } = useGetMyTeacher(String(slug?.teacherLink));

  const { registrationFunction, error, loading, success } = useAuthUser();

  const setUser = useUserStore((state) => state.setUser);
  const onSubmit: SubmitHandler<IRegistrationData> = async (data) => {
    const res = await registrationFunction({
      ...data,
      profileType: "student",
      referralCode: String(slug?.teacherLink),
    });
    if (res.user) {
      setUser({ userId: res.user.id, ...res.user });
      if (res.user.profileType === "student") {
        router.push("/student/schedule");
      } else {
        router.push("/teacher/schedule");
      }
    }
  };

  const onSubmitCurrentAccount = () => {
    console.log(
      "onSubmitCurrentAccount",
      payload?.userId as string,
      slug?.teacherLink as string
    );

    connectStudentFunc(payload?.userId as string, slug?.teacherLink as string);
  };

  if (tutorLoading || loadingCheckSession) return <Spinner />;

  if (errorUse) return <FindTeacherError />;

  return (
    <div>
      {tutor && !tutorLoading && <YourTeacher teacher={tutor} />}
      {!payload ? (
        <RegistrationFormComponent
          onSubmit={onSubmit}
          error={error}
          loading={loading}
          success={success}
          selected={"student"}
          changeTypeLink={`/login/${slug?.teacherLink as string}`}
        />
      ) : (
        <CurrentAccount
          name={payload.name as string}
          phoneNumber={payload.phoneNumber as string}
          submit={onSubmitCurrentAccount}
        />
      )}
    </div>
  );
};

export default RegistrationRef;
