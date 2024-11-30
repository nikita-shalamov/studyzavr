import { Tabs, Tab } from "@nextui-org/react";
import styles from "./accountType.module.scss";
import { useState, useEffect } from "react";

interface AccountTypesProps {
  onChange: (newValue: string) => void;
  currentValue: string;
}

const AccountType = ({ onChange, currentValue }: AccountTypesProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 450);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        className={styles.tabs}
        isVertical={isMobile}
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
