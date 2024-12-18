import moment from "moment";
import "moment-timezone";
import styles from "./lesson.module.scss";
import ChangeLessonModal from "../changeLessonModal/ChangeLessonModal";
import { useDisclosure } from "@nextui-org/react";
import CopyText from "../copyText/CopyText";

interface LessonProps {
  lesson: {
    student: { name: string; id: string };
    tutor?: { name: string };
    lessonDate: string;
    id: number;
    lessonWas: boolean;
    lessonLink: string;
  };
  type: "student" | "teacher";
}

const Lesson = ({ lesson, type }: LessonProps) => {
  const timezone = moment.tz.guess();
  const { isOpen, onOpenChange } = useDisclosure();
  return (
    <>
      {type === "teacher" && (
        <div>
          <div className={styles.lesson} onClick={onOpenChange}>
            <span className={styles.name}>{lesson.student.name}</span>
            <span className={styles.time}>
              {moment(lesson.lessonDate).tz(timezone).format("HH:mm")}
            </span>
            {lesson.lessonLink && (
              <CopyText text={"Ссылка на урок"} link={lesson.lessonLink} />
            )}
          </div>
          <ChangeLessonModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            lesson={lesson}
          />
        </div>
      )}
      {type === "student" && (
        <div className={styles.lesson} onClick={onOpenChange}>
          <span className={styles.name}>
            {lesson.tutor && lesson.tutor.name}
          </span>
          <span className={styles.time}>
            {moment(lesson.lessonDate).tz(timezone).format("HH:mm")}
          </span>
          {lesson.lessonLink && (
            <CopyText text={"Ссылка на урок"} link={lesson.lessonLink} />
          )}
        </div>
      )}
    </>
  );
};

export default Lesson;
