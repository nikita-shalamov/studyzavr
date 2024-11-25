"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import styles from "../loginForm/loginForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginData } from "@/types/authData.types";
import {
  validatePassword,
  validatePhoneNumber,
} from "@/helpers/validateLoginData";
import Link from "next/link";
import Image from "next/image";
import useAuthUser from "@/hooks/useAuthUser";
import { redirect, useParams } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import YourTeacher from "@/components/YourTeacher/YourTeacher";
import useGetMyTeacher from "@/hooks/useGetMyTeacher";
import Spinner from "@/components/loader/Spinner";

const LoginFormRef = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const slug = useParams();
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
        redirect("/student/schedule");
      } else {
        redirect("/teacher/schedule");
      }
    }
  };

  const [viewPassword, setViewPassword] = useState(true);

  if (tutorLoading) return <Spinner />;

  if (errorUse) {
    return (
      <div className="text-center flex flex-col gap-4">
        <div className="text-danger font-semibold">
          Преподаватель не найден!
        </div>
        <div>Попросите у своего учителя корректную ссылку</div>
        <Button
          onClick={() => {
            redirect("/");
          }}
          color="primary"
          className="w-fit mx-auto"
        >
          Перейти на главную страницу
        </Button>
      </div>
    );
  }

  return (
    <div>
      {tutor && !tutorLoading && <YourTeacher teacher={tutor} />}
      <div className={styles.loginForm}>
        <h2 className={styles.title}>Вход</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Номер телефона</label>
            <div className={styles.inputField}>
              <input
                {...register("phoneNumber", {
                  required: "Введите номер телефона",
                  validate: validatePhoneNumber,
                })}
                className={`${errors.phoneNumber && styles.inputError} ${
                  styles.input
                }`}
                placeholder="7912072193"
                type="tel"
              />
            </div>
            {errors.phoneNumber && (
              <p className={styles.error}>{errors.phoneNumber.message}</p>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              <div>Пароль</div>
            </label>
            <div className={styles.inputField}>
              <input
                {...register("password", {
                  required: "Введите пароль",
                  validate: validatePassword,
                })}
                className={`${errors.password && styles.inputError} ${
                  styles.input
                }`}
                type={viewPassword ? "password" : "text"}
                placeholder="********"
              />
              <button
                className={styles.eyeButton}
                onClick={(event) => {
                  event.preventDefault();
                  setViewPassword((prevView) => !prevView);
                }}
              >
                <Image
                  src={viewPassword ? "/icons/eye.svg" : "/icons/eye-close.svg"}
                  alt={"eye password"}
                  width={28}
                  height={28}
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          {error && (
            <p className={styles.error} style={{ textAlign: "center" }}>
              {error}
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            className={styles.button}
            color={!success ? "primary" : "success"}
            fullWidth
            isLoading={loading}
          >
            {!success ? "Войти как ученик" : "Успешный вход!"}
          </Button>
        </form>
        <div className={styles.anotherAuthPage}>
          Еще нет аккаунта?{" "}
          <Link
            href={`/registration/${slug.teacherLink}`}
            className={styles.link}
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginFormRef;
