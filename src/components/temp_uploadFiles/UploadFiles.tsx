interface FileItem {
  name: string;
  file: File;
}

interface UploadFilesProps {
  files: [] | FileItem[];
  setFiles: (newFiles: FileItem[]) => void;
}

const UploadFiles = ({ files, setFiles }: UploadFilesProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: FileItem[] = Array.from(event.target.files).map(
        (file) => ({
          name: file.name,
          file,
        })
      );

      const filteredFiles = newFiles.filter((newFile) =>
        files.every((existingFile) => existingFile.name !== newFile.name)
      );

      if (filteredFiles.length > 0) {
        setFiles([...files, ...filteredFiles]);
      }
    }
  };

  const handleDelete = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className="block cursor-pointer border-1.5 text-grey py-2 px-2 text-sm rounded-md hover:bg-slate-100 text-center w-[130px]"
      >
        Загрузить файл
      </label>
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        multiple
        accept=".png,.jpg,.jpeg,.docx,.pdf"
        className="hidden"
      />
      <ul className="mt-2">
        {files.length > 0 ? (
          files.map((fileItem, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 px-2 border-b"
            >
              <span className="text-sm font-medium text-gray-800">
                {fileItem.name}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleDelete(fileItem.name)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-2">Файлы не добавлены</p>
        )}
      </ul>
    </div>
  );
};

export default UploadFiles;
