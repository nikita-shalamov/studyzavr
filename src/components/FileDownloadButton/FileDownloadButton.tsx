import React, { useState } from "react";
import styles from "./fileDownloadButton.module.scss";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";

interface FileDownloadButtonProps {
  fileRandomName: string;
  fileName: string;
}

const FileDownloadButton = ({
  fileRandomName,
  fileName,
}: FileDownloadButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = async (fileName: string, originalName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/download?file=${fileName}`
      );
      if (!response.ok) {
        console.error("Ошибка при скачивании файла");
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = originalName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Ошибка при скачивании файла");
      console.error("Ошибка при скачивании файла:", error);
    } finally {
      setIsLoading(false); // Завершаем загрузку
    }
  };

  return (
    <button
      onClick={() => downloadFile(fileRandomName, fileName)}
      className={styles.downloadButton}
      disabled={isLoading}
      style={isLoading ? { cursor: "pointer" } : {}}
    >
      {isLoading ? <Spinner size="sm" /> : "Скачать"}
    </button>
  );
};

export default FileDownloadButton;
