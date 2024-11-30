"use client";

import { Snippet } from "@nextui-org/snippet";
import styles from "./page.module.scss";
import StudentCards from "@/components/studentCards/StudentCards";
import Spinner from "@/components/loader/Spinner";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import useGetStudents from "@/hooks/students/useGetStudents";
import useGetNoneConfirmedStudents from "@/hooks/students/useGetNoneConfirmedStudents";

export default function TeacherStudents() {
  const [isMobileView, setIsMobileView] = useState(false);
  const user = useUserStore((state) => state.user);
  const invitationLink = `https://studyzavr.ru/registration/${user?.referralCode}`;
  const { students } = useGetStudents(user?.userId as string);
  const { students: noneConfirmedStudents } = useGetNoneConfirmedStudents(
    user?.userId as string
  );

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
      ) : noneConfirmedStudents.length === 0 ? (
        <p>Пока что нет новых учеников</p>
      ) : (
        <StudentCards type={"new"} data={noneConfirmedStudents} />
      )}
      <h2 className={styles.blockTitle}>Список учеников:</h2>
      {students === undefined ? (
        <Spinner />
      ) : students.length === 0 ? (
        <p>Пока что нет учеников</p>
      ) : (
        <StudentCards type={"exists"} data={students} />
      )}
    </div>
  );
}
