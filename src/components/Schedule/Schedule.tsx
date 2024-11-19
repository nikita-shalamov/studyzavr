"use client";

import {
  Select,
  SelectItem,
  Avatar,
  Button,
  TimeInput,
  DateInput,
} from "@nextui-org/react";
import { users } from "./data.js";
import styles from "./schedule.module.scss";
import { useState } from "react";
import Image from "next/image";
import { isToday } from "@/helpers/date/isToday";
import { getWeekDays } from "@/helpers/date/getWeekDays";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Checkbox } from "@nextui-org/checkbox";
import { I18nProvider } from "@react-aria/i18n";
import { parseAbsoluteToLocal } from "@internationalized/date";

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const newDate = new Date();
  const [date, setDate] = useState(parseAbsoluteToLocal(newDate.toISOString()));

  const handlePaginationWeek = (type: string) => {
    const week = new Date(currentDate);
    if (type === "prev") {
      week.setDate(currentDate.getDate() - 7);
    } else {
      week.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(week);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const currentMonth = currentDate.toLocaleString("ru-RU", { month: "long" });

  const weekDays = getWeekDays(currentDate);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.header}>
        <Button onPress={onOpen} color="primary" variant="solid" size="sm">
          Добавить урок
          <Image
            src={"/icons/plus.svg"}
            alt="plus button"
            width={20}
            height={20}
          />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Новый урок
                </ModalHeader>
                <ModalBody>
                  <Select
                    items={users}
                    label="Ученик:"
                    placeholder="Выбрать ученика"
                    labelPlacement="outside"
                    className="max-w-xs"
                  >
                    {(user) => (
                      <SelectItem key={user.id} textValue={user.name}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            alt={user.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={user.avatar}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">{user.name}</span>
                            <span className="text-tiny text-default-400">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  {/* <InputData width="max-w-xs" setDateState={setDate} /> */}
                  <TimeInput
                    label="Время"
                    labelPlacement="outside"
                    hourCycle={24}
                    granularity="minute"
                    hideTimeZone
                    className="max-w-xs"
                  />
                  <I18nProvider locale="hi-IN-u-ca-indian">
                    <DateInput
                      label="Appointment date"
                      value={date}
                      onChange={setDate}
                    />
                  </I18nProvider>
                  <Checkbox defaultSelected={false}>Урок состоялся</Checkbox>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Отмена
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Добавить
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className={styles.pagination}>
          <div className={styles.currentMonth}>
            {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
          </div>
          <Button
            onClick={() => handlePaginationWeek("prev")}
            isIconOnly
            color="default"
            size="sm"
            className={styles.paginationButton}
            variant="light"
          >
            <Image
              src={"/icons/left-pagination.svg"}
              alt="left pagination"
              width={20}
              height={20}
            />
          </Button>
          <button onClick={handleToday} className={styles.todayButton}>
            Сегодня
          </button>
          <Button
            onClick={() => handlePaginationWeek("next")}
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
      </div>
      <div className={styles.calendareDates}>
        {weekDays.map((day, index) => (
          <div key={index}>
            <div
              key={index}
              className={`${styles.calendareDate} ${
                isToday(day.fullDate) ? styles.active : null
              }`}
            >
              <div>
                {day.dayName}, {day.dayNumber}
              </div>
            </div>
            <div className={styles.lessons}>
              <div className={styles.lesson}>
                <span className={styles.name}>Иванов Иван</span>
                <span className={styles.time}>10:00</span>
              </div>
              <div className={styles.lesson}>
                <span className={styles.name}>Петров Петр</span>
                <span className={styles.time}>16:00</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
