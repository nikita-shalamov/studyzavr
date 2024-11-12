import React from "react";
import styles from "./infoBlock.module.scss";
import Image from "next/image";

const InfoBlock = () => {
  return (
    <div className={styles.infoCol}>
      <h2 className={styles.title}>Англскул авторизация</h2>
      <h3 className={styles.subtitle}>
        Англскул - это сервис для репетиторов и учеников
      </h3>
      {/* <Image
        src={"/images/illustration-auth.png"}
        width={480}
        height={480}
        alt="il"
        className={styles.picture}
      /> */}
      <Image
        src={"/images/left-top-circles.svg"}
        width={200}
        height={200}
        alt="circles"
        className={styles.circles}
      />
    </div>
  );
};

export default InfoBlock;
