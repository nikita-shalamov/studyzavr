"use client";

import { Input, Textarea } from "@nextui-org/input";
import { useEffect, useState } from "react";
import InputData from "../inputData/InputDate";
import { Card, CardBody } from "@nextui-org/card";
import UploadFiles from "../uploadFiles/UploadFiles";
import styles from "./addHomeworkCard.module.scss";
import { Button } from "@nextui-org/button";
import useAddHomework from "@/hooks/homework/useAddHomework";
import { useUserStore } from "@/store/useUserStore";
import { useParams } from "next/navigation";

interface AddHomeworkCardProps {
  setActive: (newValue: boolean) => void;
}

interface FileItem {
  name: string;
  file: File;
}

const AddHomeworkCard = ({ setActive }: AddHomeworkCardProps) => {
  const slug = useParams();
  const user = useUserStore((state) => state.user);

  const [homework, setHomework] = useState({
    title: "",
    text: "",
  });
  const [date, setDate] = useState("");
  const [files, setFiles] = useState<FileItem[]>([]);

  const { addHomeworkFunc, loading, success } = useAddHomework();

  useEffect(() => {
    if (success) {
      setActive(false);
    }
  }, [success]);

  return (
    <Card
      style={{
        maxWidth: 600,
        marginTop: 10,
      }}
    >
      <CardBody>
        <div className={styles.inputForm}>
          <Input
            variant={"flat"}
            labelPlacement="outside"
            type="text"
            label="Заголовок"
            placeholder="Present Simple and Present Continuous"
            value={homework.title}
            onChange={(e) => {
              setHomework((prevHomework) => ({
                ...prevHomework,
                title: e.target.value,
              }));
            }}
          />
          <InputData setDateState={setDate} />
          <Textarea
            key={"flat"}
            variant={"flat"}
            label="Текст"
            labelPlacement="outside"
            placeholder="Сделать упражнения 1 и 2 из прикрепленного файла"
            maxRows={10}
            value={homework.text}
            onChange={(e) => {
              setHomework((prevHomework) => ({
                ...prevHomework,
                text: e.target.value,
              }));
            }}
          />
          <UploadFiles files={files} setFiles={setFiles} />
          <div className="flex gap-2">
            <Button
              variant="light"
              onClick={() => {
                localStorage.clear();
                setActive(false);
              }}
            >
              Отмена
            </Button>
            <Button
              color="primary"
              isLoading={loading}
              onClick={() => {
                addHomeworkFunc({
                  tutorId: user?.userId as string,
                  studentId: slug.studentId as string,
                  files,
                  ...homework,
                  date,
                });
              }}
            >
              Добавить
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AddHomeworkCard;
