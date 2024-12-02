"use client";
import { Card, CardBody, User, Button } from "@nextui-org/react";
import styles from "./studentCard.module.scss";
import { IStudentCardProps } from "@/types/studentCardProps.types";
import Image from "next/image";
import useConfirmStudent from "@/hooks/students/useConfirmStudent";
import { useUserStore } from "@/store/useUserStore";
import useRemoveStudent from "@/hooks/students/useRemoveStudent";
import StudentCardSettings from "../studentCardSettings/StudentCardSettings";

const StudentCard = ({ id, name, image, type }: IStudentCardProps) => {
  const { confirm } = useConfirmStudent();
  const { remove } = useRemoveStudent();
  const { user } = useUserStore((state) => state);

  return (
    <Card
      style={{
        maxWidth: 700,
        cursor: type === "homework" ? "pointer" : "default",
      }}
    >
      <CardBody className={styles.cardBody}>
        <div className={styles.cardFlex}>
          <User
            name={name}
            avatarProps={{
              src: image,
            }}
            className={styles.user}
          />
          {type === "new" && (
            <div className="flex gap-4 items-center justify-between">
              <Button
                color="default"
                variant="faded"
                onClick={() => {
                  if (user && user.userId) {
                    remove(user.userId, String(id));
                  }
                }}
              >
                Отмена
              </Button>
              <Button
                onClick={() => {
                  if (user && user.userId) {
                    confirm(user.userId, String(id));
                  }
                }}
                color="primary"
                variant="solid"
              >
                Добавить
              </Button>
            </div>
          )}
          {type === "exists" && <StudentCardSettings user={user} id={id} />}
          {type === "homework" && (
            <div className="flex flex-wrap gap-4 items-center">
              <Image
                src={"/icons/right-arrow.svg"}
                alt={"right arrow"}
                width={30}
                height={30}
              />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default StudentCard;
