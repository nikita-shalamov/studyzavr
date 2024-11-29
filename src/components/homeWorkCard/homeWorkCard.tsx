"use client";

import { formatDate } from "@/helpers/date/formatDate";
import styles from "./homeWorkCard.module.scss";
import { Card, CardBody } from "@nextui-org/card";
import { IHomeworkCard } from "@/types/homeworkCard.types";
import { downloadFile } from "@/helpers/downloadFile";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";
import { useParams } from "next/navigation";
import useDeleteHomework from "@/hooks/homework/useDeleteHomework";

const HomeWorkCard = ({
  id,
  title,
  date,
  text,
  fileNames,
  fileRandomNames,
  userType,
}: IHomeworkCard) => {
  const slug = useParams();
  const user = useUserStore((state) => state.user);
  const { deleteHomeworkFunc } = useDeleteHomework();
  const handleDelete = () => {
    deleteHomeworkFunc(
      slug.studentId as string,
      user?.userId as string,
      id.toString()
    );
  };
  return (
    <Card className={styles.cardContainer}>
      <CardBody>
        <div className={styles.homeWorkCard}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <div className="flex gap-2 items-center">
              <div className={styles.date}>{formatDate(date)}</div>
              {userType === "teacher" && (
                <Button
                  variant="light"
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete()}
                  isIconOnly
                >
                  <Image
                    src={"/icons/trash.svg"}
                    alt={"delete homework"}
                    width={16}
                    height={16}
                  />
                </Button>
              )}
            </div>
          </div>
          <div className="text-base text-gray-700 mt-5">{text}</div>
          <ul className="mt-2">
            {fileNames.length > 0 ? (
              fileNames.map((fileName, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2 px-2 border-b"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {fileName}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        downloadFile(fileRandomNames[index], fileName)
                      }
                      className="text-sm text-primary hover:text-primary-700"
                    >
                      Скачать
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500 mt-2">Файлы не добавлены</p>
            )}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default HomeWorkCard;
