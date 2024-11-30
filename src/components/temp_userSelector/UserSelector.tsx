"use client";

import { Card, CardBody, User } from "@nextui-org/react";
import styles from "./userSelector.module.scss";

interface IUser {
  id: number;
  name: string;
  image: string;
}

interface UserSelectorProps {
  users: IUser[];
  selectedId: number | null;
  setSelectedId: (newValue: number) => void;
}

const UserSelector = ({
  users,
  setSelectedId,
  selectedId,
}: UserSelectorProps) => {
  return (
    <div className="max-w-full">
      <div className={styles.container}>
        {users.map((item: IUser) => {
          return (
            <Card
              key={item.id}
              className={`cursor-pointer border-1.5 ${
                selectedId === item.id && "border-slate-400"
              }`}
            >
              <CardBody
                onClick={() => {
                  setSelectedId(item.id);
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

export default UserSelector;
