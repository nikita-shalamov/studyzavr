"use client";
import styles from "./studentCards.module.scss";
import UserCard from "../studentCard/StudentCard";
import Link from "next/link";

interface StudentCards {
  type: string;
  data: { student: { id: number; name: string; img?: string } }[];
}

const StudentCards = ({ type, data }: StudentCards) => {
  return (
    <div className={styles.cardsContainer}>
      {type === "homework"
        ? data.map((item, index) => {
            return (
              <Link key={index} href={`/teacher/homework/${item.student.id}`}>
                <UserCard
                  key={index}
                  name={item.student.name}
                  img={item.student.img || ""}
                  type={type}
                />
              </Link>
            );
          })
        : data.map((item, index) => {
            return (
              <UserCard
                id={item.student.id}
                key={index}
                name={item.student.name}
                img={item.student.img || ""}
                type={type}
              />
            );
          })}
    </div>
  );
};

export default StudentCards;
