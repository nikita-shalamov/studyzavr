export const downloadFile = async (fileName: string, originalName: string) => {
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
  a.download = originalName; // Имя файла для скачивания
  a.click();
  window.URL.revokeObjectURL(url);
};
