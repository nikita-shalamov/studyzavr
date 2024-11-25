"use client";

import moment, { Moment } from "moment";
import styles from "./scheduleDates.module.scss";
import { useUserStore } from "@/store/useUserStore";
import Spinner from "../../loader/Spinner";
import Lesson from "../../lesson/Lesson";
import useGetTeacherLessons from "@/hooks/lessons/useGetTeacherLessons";

interface Lesson {
  student: { name: string; id: string };
  lessonDate: string;
  id: number;
  lessonWas: boolean;
}

interface ScheduleDatesProps {
  currentDate: Moment;
}

const ScheduleDates = ({ currentDate }: ScheduleDatesProps) => {
  moment.locale("ru");
  const { user } = useUserStore();
  const startOfWeekIso = currentDate.clone().startOf("isoWeek");
  const startOfWeek = currentDate.clone().startOf("isoWeek").utc().format();
  const endOfWeek = currentDate.clone().endOf("isoWeek").utc().format();

  const { data, isLoading } = useGetTeacherLessons(
    user?.userId as string,
    startOfWeek,
    endOfWeek
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.calendareDates}>
      {[...Array(7)].map((_, index) => {
        const day = startOfWeekIso.clone().add(index, "days");
        const lessonsOnDay = data?.lessons
          .filter((lesson: Lesson) => {
            const lessonDate = moment(lesson.lessonDate);
            return lessonDate.isSame(day, "day");
          })
          .sort((a: Lesson, b: Lesson) => {
            return moment(a.lessonDate).isBefore(moment(b.lessonDate)) ? -1 : 1;
          });

        return (
          <div key={index}>
            <div
              className={`${styles.calendareDate} ${
                day.isSame(moment(), "day") ? styles.active : ""
              }`}
            >
              {day.format("ddd, D")}
            </div>
            <div className={styles.lessons}>
              {lessonsOnDay && lessonsOnDay.length > 0 ? (
                lessonsOnDay.map((lesson: Lesson, i: number) => (
                  <Lesson type={"teacher"} lesson={lesson} key={i} />
                ))
              ) : (
                <div className="text-center">Нет уроков</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleDates;
