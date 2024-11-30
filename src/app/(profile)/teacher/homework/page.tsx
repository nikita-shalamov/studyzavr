"use client";

import Spinner from "@/components/loader/Spinner";
import StudentCards from "@/components/studentCards/StudentCards";
import useGetStudents from "@/hooks/students/useGetStudents";
import { useUserStore } from "@/store/useUserStore";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";

const TeacherHomework = () => {
  const user = useUserStore((state) => state.user);
  const { students } = useGetStudents(user?.userId as string);

  return (
    <div>
      <h1 className="pageTitle">Домашняя работа</h1>
      {students && !students?.length ? (
        <Result
          icon={<SmileOutlined />}
          title='У вас еще нет студентов! Отправьте им свою ссылку во вкладке "Ученики"'
          className="max-w-2xl mx-auto"
        />
      ) : !students ? (
        <Spinner />
      ) : (
        <StudentCards type={"homework"} data={students} />
      )}
    </div>
  );
};

export default TeacherHomework;
