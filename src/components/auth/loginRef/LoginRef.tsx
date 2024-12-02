"use client";

import { SubmitHandler } from "react-hook-form";
import { ILoginData } from "@/types/authData.types";
import useAuthUser from "@/hooks/user/useAuthUser";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import YourTeacher from "@/components/yourTeacher/YourTeacher";
import useGetMyTeacher from "@/hooks/teachers/useGetMyTeacher";
import Spinner from "@/components/loader/Spinner";
import useCheckSession from "@/hooks/user/useCheckSession";
import FindTeacherError from "../findTeacherError/FindTeacherError";
import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";
import CurrentAccount from "../currentAccount/CurrentAccount";
import useConnectStudent from "@/hooks/students/useConnectStudent";

const LoginRef = () => {
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

  const { loginFunction, error, loading, success } = useAuthUser();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    const res = await loginFunction({
      ...data,
      phoneNumber: data.phoneNumber,
      profileType: "student",
      referralCode: String(slug.teacherLink),
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
    connectStudentFunc(payload?.userId as string, slug?.teacherLink as string);
  };

  if (tutorLoading || loadingCheckSession) return <Spinner />;

  if (errorUse) return <FindTeacherError />;

  return (
    <div>
      {tutor && !tutorLoading && <YourTeacher teacher={tutor} />}
      {!payload ? (
        <LoginFormComponent
          onSubmit={onSubmit}
          error={error || undefined}
          loading={loading}
          success={success}
          selected={"student"}
          changeTypeLink={`/registration/${slug?.teacherLink as string}`}
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

export default LoginRef;
