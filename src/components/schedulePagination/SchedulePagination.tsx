import { Button } from "@nextui-org/react";
import moment, { Moment } from "moment";
import Image from "next/image";
import styles from "./schedulePagination.module.scss";
import "moment/locale/ru"; // Загружаем локализацию

interface SchedulePaginationProps {
  setDate: (newValue: Moment) => void;
  currentDate: Moment;
}

const SchedulePagination = ({
  setDate,
  currentDate,
}: SchedulePaginationProps) => {
  moment.locale("ru");
  const handlePrevWeek = () => setDate(currentDate.clone().subtract(1, "week"));
  const handleNextWeek = () => setDate(currentDate.clone().add(1, "week"));

  return (
    <div className={styles.pagination}>
      <div className={styles.currentMonth}>{currentDate.format("MMMM")}</div>
      <Button
        onClick={handlePrevWeek}
        isIconOnly
        color="default"
        size="sm"
        className={styles.paginationButton}
        variant="light"
      >
        <Image
          src={"/icons/left-pagination.svg"}
          alt={"left pagination"}
          width={20}
          height={20}
        />
      </Button>
      <button onClick={() => setDate(moment())} className={styles.todayButton}>
        Сегодня
      </button>
      <Button
        onClick={handleNextWeek}
        isIconOnly
        color="default"
        size="sm"
        className={styles.paginationButton}
        variant="light"
      >
        <Image
          src={"/icons/right-pagination.svg"}
          alt="right pagination"
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};

export default SchedulePagination;
