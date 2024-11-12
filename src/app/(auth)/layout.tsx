"use client";

import { ReactNode } from "react";
import styles from "./layout.module.scss";
import InfoBlock from "@/components/auth/infoBlock/InfoBlock";

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="min-h-[100vh] w-[100vw]">
      <div className={styles.regContainer}>
        <InfoBlock />
        <div className={styles.authCol}>
          <div className={styles.authCard}>
            <div className={styles.authForm}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
