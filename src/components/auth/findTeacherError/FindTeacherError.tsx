import React from "react";
import styles from "./findTeacherError.module.scss";
import { Button } from "@nextui-org/button";
import { redirect } from "next/navigation";

const FindTeacherError = () => {
  return (
    <div className={styles.container}>
      <div className={styles.error}>Преподаватель не найден!</div>
      <div>Попросите у своего учителя корректную ссылку</div>
      <Button
        onClick={() => {
          redirect("/");
        }}
        color="primary"
        className={styles.goMainButton}
      >
        Перейти на главную страницу
      </Button>
    </div>
  );
};

export default FindTeacherError;
