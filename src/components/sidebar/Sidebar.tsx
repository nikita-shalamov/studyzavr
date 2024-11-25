"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import { menuStudent } from "../../constants/menuStudent.constant";
import { menuTeacher } from "../../constants/menuTeacher.constant";
import { useUserStore } from "@/store/useUserStore";
import { Spinner } from "@nextui-org/spinner";

interface SidebarProps {
  link: string;
  title: string;
  icon: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const menuItems = user?.profileType === "teacher" ? menuTeacher : menuStudent;

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logo}>
        <Image src="/icons/menu.svg" alt="" width={30} height={30} />
        Logo
      </div>
      <div className={styles.items}>
        {menuItems ? (
          menuItems.map((item: SidebarProps, index: number) => {
            return (
              <Link
                key={index}
                href={item.link}
                className={`${styles.item} ${
                  item.link === pathname ? styles.active : null
                }`}
              >
                <Image src={item.icon} alt="" width={24} height={24} />
                {item.title}
              </Link>
            );
          })
        ) : (
          <div className={styles.sidebarContainer}>
            <Spinner color="default" />
          </div>
        )}
      </div>
      <div className={styles.contacts}>
        <Image src="/icons/vk.svg" alt="" width={48} height={48} />
        <Image src="/icons/telegram.svg" alt="" width={48} height={48} />
      </div>
    </div>
  );
};

export default Sidebar;
