import React, { useState } from "react";
import styles from "./fileDownloadButton.module.scss";
import { toast } from "react-toastify";
// import { Spinner } from "@nextui-org/react";

interface FileDownloadButtonProps {
  fileRandomName: string;
  fileName: string;
}

const FileDownloadButton = ({
  fileRandomName,
  fileName,
}: FileDownloadButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadFile = async (fileName: string, originalName: string) => {
    setIsLoading(true);

    try {
      setProgress(0);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/download?file=${fileName}`
      );
      if (!response.ok) {
        console.error("Ошибка при скачивании файла");
        return;
      }

      const reader = response.body?.getReader();
      const contentLength = +(response.headers.get("Content-Length") ?? 0);

      let receivedLength = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader!.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;
        setProgress(Math.round((receivedLength / contentLength) * 100));
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = originalName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Файл успешно скачан!");
    } catch (error) {
      toast.error("Ошибка при скачивании файла");
      console.error("Ошибка при скачивании файла:", error);
    } finally {
      setIsLoading(false); // Завершаем загрузку
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => downloadFile(fileRandomName, fileName)}
        className={styles.downloadButton}
        disabled={isLoading}
        style={isLoading ? { cursor: "pointer" } : {}}
      >
        {/* {isLoading ? <Spinner size="sm" /> : "Скачать"} */}
        {progress > 0 && isLoading ? <span>{progress}%</span> : "Скачать"}
      </button>
    </div>
  );
};

export default FileDownloadButton;
