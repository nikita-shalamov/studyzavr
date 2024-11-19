"use client";

import { formatDate } from "@/helpers/date/formatDate";
import styles from "./homeWorkCard.module.scss";
import { Card, CardBody } from "@nextui-org/card";
import { IHomeworkCard } from "@/types/homeworkCard.types";
import { downloadFile } from "@/helpers/downloadFile";

const HomeWorkCard = ({
  title,
  date,
  text,
  fileNames,
  fileRandomNames,
}: IHomeworkCard) => {
  return (
    <Card className={styles.cardContainer}>
      <CardBody>
        <div className={styles.homeWorkCard}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.date}>{formatDate(date)}</div>
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
