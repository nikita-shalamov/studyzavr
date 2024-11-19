import { getSession } from "@/app/lib/session";
import StudentCards from "@/components/studentCards/StudentCards";
import { getStudents } from "@/services/students/getStudents.service";

const TeacherHomework = async () => {
  const session = await getSession();
  const data = await getStudents(session?.userId as string);

  return (
    <div>
      <h1 className="pageTitle">Домашняя работа</h1>
      <StudentCards type={"homework"} data={data.data.students} />
    </div>
  );
};

export default TeacherHomework;
