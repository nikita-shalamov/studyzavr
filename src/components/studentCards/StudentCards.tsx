"use client";
import styles from "./studentCards.module.scss";
import Link from "next/link";
import StudentCard from "../studentCard/StudentCard";

interface StudentCards {
  type: string;
  data: { id: number; name: string; image: string | null }[];
}

const StudentCards = ({ type, data }: StudentCards) => {
  return (
    <div className={styles.cardsContainer}>
      {type === "homework"
        ? data.map((item, index) => {
            return (
              <Link key={index} href={`/teacher/homework/${item.id}`}>
                <StudentCard
                  key={index}
                  name={item.name}
                  image={item.image || ""}
                  type={type}
                />
              </Link>
            );
          })
        : data.map((item, index) => {
            return (
              <StudentCard
                id={item.id}
                key={index}
                name={item.name}
                image={item.image || ""}
                type={type}
              />
            );
          })}
    </div>
  );
};

export default StudentCards;
