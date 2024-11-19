"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import AddHomeworkCard from "../addHomeworkCard/AddHomeworkCard";

const AddHomework = () => {
  const [active, setActive] = useState(false);

  return (
    <div>
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
      {active && <AddHomeworkCard setActive={setActive} />}
    </div>
  );
};

export default AddHomework;
