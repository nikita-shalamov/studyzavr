"use client";

import { IHomeworkCard } from "@/types/homeworkCard.types";
import HomeWorkCard from "../../homeWorkCard/homeWorkCard";
import Spinner from "../../loader/Spinner";
import styles from "./homeWorkCards.module.scss";
import { useParams } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import useGetHomework from "@/hooks/homework/useGetHomework";

const HomeWorkCards = () => {
  const slug = useParams();
  const user = useUserStore((state) => state.user);
  const { homework, isLoading } = useGetHomework(
    user?.userId as string,
    slug.studentId as string
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.cards}>
      {homework && (
        <div className={styles.studentName}>
          Студент: {homework.student.name}
        </div>
      )}
      {homework?.homework.length ? (
        homework.homework.map((item: IHomeworkCard, index: number) => {
          return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            <HomeWorkCard userType={user?.profileType} key={index} {...item} />
          );
        })
      ) : (
        <p>Нет домашних заданий!</p>
      )}
    </div>
  );
};

export default HomeWorkCards;
