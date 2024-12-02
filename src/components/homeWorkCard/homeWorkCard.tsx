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
import { useState, useEffect } from "react";
import FileViewer from "../fileViewer/FileViewer";

const HomeWorkCard = ({
  id,
  title,
  date,
  text,
  fileNames,
  fileRandomNames,
  userType,
}: IHomeworkCard) => {
  const [windowWidth, setWindowWidth] = useState(0);
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

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <Card className={styles.cardContainer}>
      <CardBody>
        <div className={styles.homeWorkCard}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.dateHeader}>
              <div className={styles.date}>{formatDate(date)}</div>
              {userType === "teacher" && (
                <Button
                  variant="light"
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete()}
                  startContent={
                    <Image
                      src={"/icons/trash.svg"}
                      alt={"delete homework"}
                      width={16}
                      height={16}
                    />
                  }
                >
                  Удалить
                </Button>
              )}
            </div>
          </div>
          <div className="text-base text-gray-700 mt-3">{text}</div>
          <ul className="mt-2">
            {fileNames.length > 0 ? (
              fileNames.map((fileName, index) => (
                <li key={index} className={styles.files}>
                  <span
                    className={`text-sm font-medium text-gray-800`}
                    style={{ maxWidth: windowWidth - 40 - 24 - 16 - 8 - 56 }}
                  >
                    {fileName}
                  </span>
                  <div className="flex gap-2">
                    <FileViewer
                      fileUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/download?file=${fileRandomNames[index]}`}
                    />
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() =>
                          downloadFile(fileRandomNames[index], fileName)
                        }
                        className={styles.downloadButton}
                      >
                        Скачать
                      </button>
                    </div>
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
