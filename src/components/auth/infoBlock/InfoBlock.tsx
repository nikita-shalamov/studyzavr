import styles from "./infoBlock.module.scss";
import Image from "next/image";

const InfoBlock = () => {
  return (
    <div className={styles.infoCol}>
      <h2 className={styles.title}>Образовательная платформа Стадизавр</h2>
      <h3 className={styles.subtitle}>
        Мы помогает ученикам и репетиторам открывать новые возможности,
        достигать больших высот и развиваться каждый день!
      </h3>
      <div className={styles.imageContainer}>
        <Image
          src={"/images/illustration-auth.webp"}
          width={200}
          height={200}
          alt="il"
          className={styles.picture}
        />
      </div>
    </div>
  );
};

export default InfoBlock;
