"use client";

import { Card, CardBody, User } from "@nextui-org/react";
import styles from "./teacherSelector.module.scss";

interface ITeacher {
  id: number;
  name: string;
  image: string;
}

interface TeacherSelectorProps {
  teachers: ITeacher[];
  tutorId: number | null;
  setTutorId: (newValue: number) => void;
}

const TeacherSelector = ({
  teachers,
  setTutorId,
  tutorId,
}: TeacherSelectorProps) => {
  return (
    <div className="max-w-full">
      <div className={styles.container}>
        {teachers.map((item: ITeacher) => {
          return (
            <Card
              key={item.id}
              className={`cursor-pointer ${
                tutorId === item.id && "border-slate-400 border-1.5"
              }`}
            >
              <CardBody
                onClick={() => {
                  setTutorId(item.id);
                }}
              >
                <User
                  name={item.name}
                  avatarProps={{
                    src: item.image,
                  }}
                  className={styles.user}
                />
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherSelector;
