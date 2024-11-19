interface FileItem {
  name: string;
  file: File;
}

export interface IAddHomework {
  files: FileItem[];
  title: string;
  text: string;
  date: string;
  tutorId: string;
  studentId: string;
}
