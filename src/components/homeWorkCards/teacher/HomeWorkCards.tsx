"use client";

import { IHomeworkCard } from "@/types/homeworkCard.types";
import HomeWorkCard from "../../homeWorkCard/homeWorkCard";
import Spinner from "../../loader/Spinner";
import styles from "./homeWorkCards.module.scss";
import { useParams } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import useGetHomework from "@/hooks/useGetHomework";

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
      {homework &&
        homework.map((item: IHomeworkCard, index: number) => {
          return <HomeWorkCard key={index} {...item} />;
        })}
    </div>
  );
};

export default HomeWorkCards;
