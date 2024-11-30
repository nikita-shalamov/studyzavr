"use client";

import HomeWorkCards from "@/components/homeWorkCards/student/HomeWorkCards";
import Spinner from "@/components/loader/Spinner";
import useGetTeachers from "@/hooks/teachers/useGetTeachers";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
import UserSelector from "@/components/userSelector/UserSelector";

const StudentHomework = () => {
  const { user } = useUserStore();
  const { data: teachers, isLoading } = useGetTeachers(user?.userId || "");
  const [tutorId, setTutorId] = useState<number | null>(null);

  useEffect(() => {
    if (teachers?.length && !tutorId) {
      setTutorId(teachers[0].id);
    }
  }, [teachers, tutorId]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className="pageTitle">Домашняя работа</h1>
      {teachers && teachers?.length ? (
        <>
          <UserSelector
            selectedId={tutorId}
            setSelectedId={setTutorId}
            users={teachers}
          />
          {tutorId && user?.userId && (
            <HomeWorkCards tutorId={tutorId} userId={Number(user?.userId)} />
          )}
        </>
      ) : (
        teachers && (
          <Result
            icon={<SmileOutlined />}
            title="У вас еще нет преподавателей!"
          />
        )
      )}
    </div>
  );
};

export default StudentHomework;
