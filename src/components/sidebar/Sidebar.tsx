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
        <Image
          src="/images/new-year-hat.png"
          alt=""
          width={36}
          height={36}
          className={styles.hat}
        />
        <Image src="/images/logo-mini.webp" alt="" width={48} height={48} />
        Стадизавр
      </div>
      <div className={styles.items}>
        {menuItems ? (
          menuItems.map((item: SidebarProps, index: number) => {
            return (
              <Link
                key={index}
                href={item.link}
                className={`${styles.item} ${
                  pathname.includes(item.link) ? styles.active : null
                }`}
              >
                <Image src={item.icon} alt="" width={24} height={24} />
                <div className={styles.name}>{item.title}</div>
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
        <a
          className="no-underline text-black"
          href="https://vk.com/e.sevryugina2015"
          target="_blank"
        >
          <Image src="/icons/vk.svg" alt="" width={48} height={48} />
        </a>
        <a
          className="no-underline text-black"
          href="https://t.me/WhiteLilyblooms"
          target="_blank"
        >
          <Image src="/icons/telegram.svg" alt="" width={48} height={48} />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
