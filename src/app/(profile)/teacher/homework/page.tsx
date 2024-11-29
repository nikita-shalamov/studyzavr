import { getSession } from "@/app/lib/session";
import StudentCards from "@/components/studentCards/StudentCards";
import { getStudents } from "@/services/students/getStudents.service";
import { SmileOutlined } from "@ant-design/icons";
import { Spinner } from "@nextui-org/spinner";
import { Result } from "antd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Домашнее задание преподавателя — Стадизавр",
  description:
    "Просмотр и добавление домашнего задания преподавателем на платформе Стадизавр.",
};

const TeacherHomework = async () => {
  const session = await getSession();
  const data = await getStudents(session?.userId as string);

  return (
    <div>
      <h1 className="pageTitle">Домашняя работа</h1>
      {data?.students && !data.students.length ? (
        <Result
          icon={<SmileOutlined />}
          title='У вас еще нет студентов! Отправьте им свою ссылку во вкладке "Ученики"'
          className="max-w-2xl mx-auto"
        />
      ) : !data?.students ? (
        <Spinner />
      ) : (
        <StudentCards type={"homework"} data={data.students} />
      )}
    </div>
  );
};

export default TeacherHomework;
