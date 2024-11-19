import { Tabs, Tab } from "@nextui-org/react";
import styles from "./accountType.module.scss";

interface AccountTypesProps {
  onChange: (newValue: string) => void;
  currentValue: string;
}

const AccountType = ({ onChange, currentValue }: AccountTypesProps) => {
  return (
    <div>
      <Tabs
        fullWidth
        size="lg"
        aria-label="Tabs form"
        selectedKey={currentValue}
        onSelectionChange={(value) => onChange(value as string)}
        variant="light"
        color="primary"
      >
        <Tab
          key="student"
          title={
            <div className={styles.authTab}>
              <span>👨🏻‍🎓</span>
              <div>Ученик</div>
            </div>
          }
          className={styles.tab}
        />
        <Tab
          key="teacher"
          title={
            <div className={styles.authTab}>
              <span>👩🏼‍🏫</span>
              <div>Преподаватель</div>
            </div>
          }
          className={styles.tab}
        />
      </Tabs>
    </div>
  );
};

export default AccountType;
