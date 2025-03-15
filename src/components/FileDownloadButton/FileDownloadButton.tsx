import { useDownloadFile } from "@/hooks/files/useDownloadFile";

interface FileDownloadButtonProps {
  fileRandomName: string;
  fileName: string;
}

const FileDownloadButton = ({ fileRandomName, fileName }: FileDownloadButtonProps) => {
  const { downloadFile, isDownloading } = useDownloadFile();

  const handleDownload = async () => {
    try {
      await downloadFile(fileRandomName, fileName);
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    }
  };

  return (
    <button
          onClick={handleDownload}
          className="text-sm text-primary hover:text-primary-700"
      disabled={isDownloading}  
        >
      Скачать
    </button>
  );
};

export default FileDownloadButton;
