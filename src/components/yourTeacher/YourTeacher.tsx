import styles from "./yourTeacher.module.scss";
import { Card, CardBody, User } from "@nextui-org/react";

interface YourTeacherProps {
  teacher: {
    name: string;
    image: string | null;
  };
}

const YourTeacher = ({ teacher }: YourTeacherProps) => {
  return (
    <div className={styles.container}>
      <Card className="w-full text-left">
        <CardBody>
          <div className={styles.title}>Ваш преподаватель:</div>
          <User
            name={teacher.name}
            avatarProps={{
              src: teacher.image || "",
            }}
            className={"flex justify-start"}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default YourTeacher;
