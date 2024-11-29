"use client";

import { Snippet } from "@nextui-org/snippet";
import styles from "./page.module.scss";
import StudentCards from "@/components/studentCards/StudentCards";
import Spinner from "@/components/loader/Spinner";
import { getSession } from "@/app/lib/session";
import { getNoneConfirmedStudents } from "@/services/students/getNoneConfirmedStudents.service";
import { getStudents } from "@/services/students/getStudents.service";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

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
  const [isMobileView, setIsMobileView] = useState(false);
  const { user } = useUserStore();
  const invitationLink = `https://studyzavr.ru/registration/${user?.referralCode}`;

  const { data: noneConfirmedStudents } = useQuery({
    queryKey: ["noneConfirmedStudents"],
    queryFn: fetchNoneConfirmedStudents,
  });
  const { data } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 900);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h1 className="pageTitle">Ученики</h1>
      <div className="font-semibold text-base">
        Ссылка для приглашения учеников:
      </div>
      <Snippet
        variant="bordered"
        className={styles.copyLink}
        size="sm"
        symbol=""
        codeString={invitationLink}
      >
        {isMobileView ? (
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(invitationLink);
            }}
            className={styles.copyButton}
          >
            Скопировать ссылку
          </button>
        ) : (
          invitationLink
        )}
      </Snippet>
      <h2 className={styles.blockTitle}>Принять новых учеников:</h2>
      {noneConfirmedStudents === undefined ? (
        <Spinner />
      ) : noneConfirmedStudents.data.students.length === 0 ? (
        <p>Пока что нет новых учеников</p>
      ) : (
        <StudentCards type={"new"} data={noneConfirmedStudents.data.students} />
      )}
      <h2 className={styles.blockTitle}>Список учеников:</h2>
      {data === undefined ? (
        <Spinner />
      ) : data.students.length === 0 ? (
        <p>Пока что нет учеников</p>
      ) : (
        <StudentCards type={"exists"} data={data.students} />
      )}
    </div>
  );
}
