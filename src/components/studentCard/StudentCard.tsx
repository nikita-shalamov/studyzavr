"use client";

import {
  Card,
  CardBody,
  User,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import styles from "./studentCard.module.scss";
import { IStudentCardProps } from "@/types/studentCardProps.types";
import Image from "next/image";
import useConfirmStudent from "@/hooks/useConfirmStudent";
import { useUserStore } from "@/store/useUserStore";
import { redirect } from "next/navigation";
import useRemoveStudent from "@/hooks/useRemoveStudent";

const UserCard = ({ id, name, image, type }: IStudentCardProps) => {
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
            <div className="flex flex-wrap gap-4 items-center">
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
          {type === "exists" && (
            <div className="flex flex-wrap gap-4 items-center">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" isIconOnly size="md">
                    <Image
                      src={"/icons/settings.svg"}
                      alt={"setting button"}
                      width={20}
                      height={20}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    onClick={() => redirect(`/teacher/homework/${id}`)}
                    className={styles.dropItem}
                    key="homework"
                  >
                    Домашнее задание
                  </DropdownItem>
                  <DropdownItem className={styles.dropItem} key="profile">
                    Профиль
                  </DropdownItem>
                  <DropdownItem className={styles.dropItem} key="zoom">
                    Зум-ссылка
                  </DropdownItem>
                  <DropdownItem
                    className={`${styles.dropItem} text-danger`}
                    key="delete"
                    color="danger"
                    onClick={() => {
                      if (user && user.userId) {
                        remove(user.userId, String(id));
                      }
                    }}
                  >
                    Убрать ученика
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
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

export default UserCard;
