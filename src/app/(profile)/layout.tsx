"use client";

import { ReactNode } from "react";
import styles from "./layout.module.scss";
import Sidebar from "@/components/sidebar/Sidebar";
import useUserSetData from "@/hooks/useUserSetData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ProfileLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  useUserSetData();
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <QueryClientProvider client={queryClient}>
        <div className={styles.mainBlock}>{children}</div>
      </QueryClientProvider>
    </div>
  );
};

export default ProfileLayout;
