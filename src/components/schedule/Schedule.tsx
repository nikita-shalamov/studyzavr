"use client";

import styles from "./schedule.module.scss";
import { useState } from "react";
import LessonModal from "../lessonModal/LessonModal";
import { parseAbsoluteToLocal } from "@internationalized/date";
import moment from "moment-timezone";
import SchedulePagination from "../schedulePagination/SchedulePagination";
import ScheduleDates from "../scheduleDates/teacher/ScheduleDates";

const Schedule = () => {
  moment.locale("ru");
  const newDate = new Date();
  const [lessonDate, setLessonDate] = useState(
    parseAbsoluteToLocal(newDate.toISOString())
  );
  const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());

  return (
    <div>
      <div className={styles.header}>
        <LessonModal date={lessonDate} setDate={setLessonDate} />
        <SchedulePagination
          currentDate={currentDate}
          setDate={setCurrentDate}
        />
      </div>
      <ScheduleDates currentDate={currentDate} />
    </div>
  );
};

export default Schedule;
