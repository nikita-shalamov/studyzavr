"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import styles from "./loginForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginData } from "@/types/authData.types";
import {
  validatePassword,
  validatePhoneNumber,
} from "@/helpers/validateLoginData";
import Link from "next/link";
import Image from "next/image";
import AccountType from "../accoutType/AccountType";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    console.log(data);
  };

  const [viewPassword, setViewPassword] = useState(true);
  const incorrectData = false;
  // const [incorrectData, setIncorrectData] = useState(false);
  const [selected, setSelected] = useState<string>("student");

  return (
    <div>
      <AccountType onChange={setSelected} currentValue={selected} />
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
                onClick={() =>
                  setViewPassword((prevView) => {
                    return !prevView;
                  })
                }
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
          {incorrectData && (
            <p className={styles.error} style={{ textAlign: "center" }}>
              Неверный телефон или пароль!
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            className={styles.button}
            color="primary"
            fullWidth
          >
            Войти
          </Button>
        </form>
        <div className={styles.anotherAuthPage}>
          Еще нет аккаунта?{" "}
          <Link href="/registration" className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
