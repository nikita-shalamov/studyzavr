"use client";
import styles from "./studentCards.module.scss";
import Link from "next/link";
import StudentCard from "../studentCard/StudentCard";

interface StudentCards {
  type: string;
  data: { student: { id: number; name: string; image: string | null } }[];
}

const StudentCards = ({ type, data }: StudentCards) => {
  return (
    <div className={styles.cardsContainer}>
      {type === "homework"
        ? data.map((item, index) => {
            return (
              <Link key={index} href={`/teacher/homework/${item.student.id}`}>
                <StudentCard
                  key={index}
                  name={item.student.name}
                  image={item.student.image || ""}
                  type={type}
                />
              </Link>
            );
          })
        : data.map((item, index) => {
            return (
              <StudentCard
                id={item.student.id}
                key={index}
                name={item.student.name}
                image={item.student.image || ""}
                type={type}
              />
            );
          })}
    </div>
  );
};

export default StudentCards;
