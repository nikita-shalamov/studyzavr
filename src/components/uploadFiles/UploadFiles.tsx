import { toast } from "react-toastify";

interface FileItem {
  name: string;
  file: File;
}

interface UploadFilesProps {
  files: [] | FileItem[];
  setFiles: (newFiles: FileItem[]) => void;
}

const MAX_FILE_SIZE_MB = 10;

const UploadFiles = ({ files, setFiles }: UploadFilesProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: FileItem[] = Array.from(event.target.files).map(
        (file) => ({
          name: file.name,
          file,
        })
      );

      const validFiles: FileItem[] = [];
      newFiles.forEach((newFile) => {
        if (newFile.file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          toast.error(`Файл превышает лимит в ${MAX_FILE_SIZE_MB} МБ.`, {
            position: "top-center",
          });
        } else if (
          !files.some((existingFile) => existingFile.name === newFile.name)
        ) {
          validFiles.push(newFile);
        }
      });

      if (validFiles.length > 0) {
        setFiles([...files, ...validFiles]);
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
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xlsx,.pptx,.txt,.zip,.rar,.7z"
        className="hidden"
      />
      <ul className="mt-2">
        {files.map((fileItem, index) => (
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
        ))}
        <p className="text-sm text-gray-500 mt-2">
          Максимальный размер файла 10MB
        </p>
      </ul>
    </div>
  );
};

export default UploadFiles;
