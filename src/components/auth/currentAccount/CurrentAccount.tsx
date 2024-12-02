import React from "react";
import styles from "./currentAccount.module.scss";
import { Button, Card, CardBody } from "@nextui-org/react";

interface CurrentAccountProps {
  name: string;
  phoneNumber: string;
  submit: () => void;
}

const CurrentAccount = ({ name, phoneNumber, submit }: CurrentAccountProps) => {
  return (
    <Card className={styles.card}>
      <CardBody>
        <h2 className={`${styles.title}`}>Текущий аккаунт</h2>
        <div className={styles.details}>
          <div className={styles.row}>
            <span className={styles.label}>Имя:</span>
            <span className={styles.value}>{name}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Телефон:</span>
            <span className={styles.value}>{phoneNumber}</span>
          </div>
          <Button color="primary" size="lg" fullWidth onClick={() => submit()}>
            Войти как {name}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CurrentAccount;
