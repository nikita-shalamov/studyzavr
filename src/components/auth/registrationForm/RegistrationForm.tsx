"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import styles from "../loginForm/loginForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegistrationData } from "@/types/authData.types";
import {
  validatePassword,
  validatePhoneNumber,
} from "@/helpers/validateLoginData";
import Link from "next/link";
import Image from "next/image";
import AccountType from "../accoutType/AccountType";
import useAuthUser from "@/hooks/useAuthUser";
import { redirect } from "next/navigation";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationData>();

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

  const [viewPassword, setViewPassword] = useState(true);
  const [selected, setSelected] = useState<string>("student");

  return (
    <div>
      <AccountType onChange={setSelected} currentValue={selected} />
      <div className={styles.loginForm}>
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Имя и фамилия</label>
            <div className={styles.inputField}>
              <input
                {...register("name", {
                  required: "Введите имя и фамилию",
                })}
                className={`${errors.name && styles.inputError} ${
                  styles.input
                }`}
                placeholder="Иван Иванов"
                type="text"
              />
            </div>
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
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
            {!success
              ? `Регистрация как ${
                  selected === "student" ? "ученик" : "преподаватель"
                }`
              : `Регистрация успешна!`}
          </Button>
        </form>
        <div className={styles.anotherAuthPage}>
          Уже есть аккаунт?{" "}
          <Link href="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
