import { useState } from "react";
import { toast } from "react-toastify";

export const useDownloadFile = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadFile = async (fileRandomName: string, originalName?: string) => {
    try {
      if (isDownloading) {
        return; // Предотвращаем повторные загрузки
      }

      setIsDownloading(true);

      const url = new URL('/api/download', window.location.origin);
      url.searchParams.set('file', fileRandomName);
      if (originalName) {
        url.searchParams.set('originalName', originalName);
      }

      // Проверяем доступность файла перед скачиванием
      const checkResponse = await fetch(url.toString(), { method: 'HEAD' });
      
      if (!checkResponse.ok) {
        const error = await checkResponse.json();
        throw new Error(error.message || 'Ошибка при проверке файла');
      }

      // Используем fetch с параметром для автоматического скачивания
      window.location.href = url.toString();
      
      toast.success('Загрузка файла началась');
    } catch (error) {
      console.error('Ошибка при скачивании:', error);
      
      let errorMessage = 'Ошибка при скачивании файла';
      
      if (error instanceof Error) {
        if (error.message.includes('не найден')) {
          errorMessage = 'Файл не найден';
        } else if (error.message.includes('доступа')) {
          errorMessage = 'Нет доступа к файлу';
        }
      }
      
      toast.error(errorMessage);
      throw error;
    } finally {
      // Небольшая задержка перед сбросом состояния, чтобы избежать мерцания кнопки
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    }
  };

  return {
    downloadFile,
    isDownloading
  };
}; 