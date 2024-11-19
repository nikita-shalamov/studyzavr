"use client";

import { Snippet } from "@nextui-org/snippet";
import styles from "./page.module.scss";
import StudentCards from "@/components/studentCards/StudentCards";
import Spinner from "@/components/loader/Spinner";
import { getSession } from "@/app/lib/session";
import { getNoneConfirmedStudents } from "@/services/students/getNoneConfirmedStudents.service";
import { getStudents } from "@/services/students/getStudents.service";
import { useQuery } from "@tanstack/react-query";

const fetchNoneConfirmedStudents = async () => {
  const session = await getSession();
  const response = await getNoneConfirmedStudents(session?.userId as string);
  return response;
};

const fetchStudents = async () => {
  const session = await getSession();
  const response = await getStudents(session?.userId as string);
  return response;
};

export default function TeacherStudents() {
  const { data: noneConfirmedStudents } = useQuery({
    queryKey: ["noneConfirmedStudents"],
    queryFn: fetchNoneConfirmedStudents,
  });
  const { data } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  return (
    <div>
      <h1 className="pageTitle">Ученики</h1>
      <Snippet
        symbol="Ваша ссылка:"
        variant="bordered"
        className={styles.copyLink}
        size="sm"
      >
        https://yourlink.ru/some-teacher-id-here
      </Snippet>
      <h2 className={styles.blockTitle}>Принять новых учеников:</h2>
      {!noneConfirmedStudents ? (
        <Spinner />
      ) : (
        <StudentCards type={"new"} data={noneConfirmedStudents.data.students} />
      )}
      <h2 className={styles.blockTitle}>Список учеников:</h2>
      {!data ? (
        <Spinner />
      ) : (
        <StudentCards type={"exists"} data={data.data.students} />
      )}
    </div>
  );
}
