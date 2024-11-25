"use client";

import { ReactNode } from "react";
import styles from "./layout.module.scss";
import InfoBlock from "@/components/auth/infoBlock/InfoBlock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default AuthLayout;
