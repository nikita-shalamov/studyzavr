"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import AddHomeworkCard from "../addHomeworkCard/AddHomeworkCard";
import styles from "./addHomework.module.scss";
import { useRouter } from "next/navigation";

const AddHomework = () => {
  const [active, setActive] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div className={styles.buttonsHomework}>
        <Button
          color="primary"
          size="md"
          onClick={() => router.back()}
          startContent={
            <Image
              src={"/icons/left-pagination-white.svg"}
              alt={"left arrow"}
              width={30}
              height={30}
            />
          }
          className="pl-1 gap-0"
        >
          Назад
        </Button>
        <Button
          color="primary"
          size="md"
          onClick={() => setActive(true)}
          endContent={
            <Image
              src={"/icons/plus.svg"}
              alt={"right arrow"}
              width={30}
              height={30}
            />
          }
          disabled={active}
        >
          Добавить домашнее задание
        </Button>
      </div>

      {active && <AddHomeworkCard setActive={setActive} />}
    </div>
  );
};

export default AddHomework;
