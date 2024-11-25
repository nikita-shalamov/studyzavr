"use client";

import { IHomeworkCard } from "@/types/homeworkCard.types";
import HomeWorkCard from "@/components/homeWorkCard/homeWorkCard";
import Spinner from "@/components/loader/Spinner";
import styles from "./homeWorkCards.module.scss";
import useGetHomework from "@/hooks/useGetHomework";

interface HomeWorkCardsProps {
  tutorId: number;
  userId: number;
}

const HomeWorkCards = ({ tutorId, userId }: HomeWorkCardsProps) => {
  const { homework, isLoading } = useGetHomework(
    String(tutorId),
    String(userId)
  );

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.cards}>
      {homework?.length ? (
        homework.map((item: IHomeworkCard) => (
          <HomeWorkCard key={item.id} {...item} />
        ))
      ) : (
        <p>Нет домашних заданий!</p>
      )}
    </div>
  );
};

export default HomeWorkCards;
