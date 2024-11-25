"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  DateInput,
  Checkbox,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./lessonModal.module.scss";
import StudentSelector from "../studentSelector/StudentSelector";
import { toISODate } from "@/helpers/date/ToAndFromISO";
import { useUserStore } from "@/store/useUserStore";
import useAddLesson from "@/hooks/lessons/useAddLesson";

interface LessonModalProps {
  date: any;
  setDate: any;
}

interface ErrorTypes {
  studentError: boolean;
  dateError: boolean;
}

const LessonModal = ({ date, setDate }: LessonModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [student, setStudent] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<ErrorTypes | null>(null);
  const user = useUserStore((state) => state.user);
  const [lessonWas, setLessonWas] = useState(false);
  const { addLessonFunc, loading } = useAddLesson();

  useEffect(() => {
    if (!date || !student) {
      setErrors({
        studentError: !student ? true : false,
        dateError: !date ? true : false,
      });
      return;
    } else {
      setErrors(null);
    }
  }, [student, date]);

  const handleAddLesson = () => {
    const lessonDate = toISODate(date);
    const studentId = student;

    addLessonFunc({
      date: lessonDate,
      tutorId: user?.userId as string,
      studentId: studentId as string,
    });
  };

  return (
    <div>
      <Button onPress={onOpen} color="primary" variant="solid" size="sm">
        Добавить урок
        <Image
          src={"/icons/plus.svg"}
          alt={"plus button"}
          width={20}
          height={20}
        />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={styles.modalHeader}>
                Новый урок
              </ModalHeader>
              <ModalBody>
                <StudentSelector
                  item={student}
                  setItem={setStudent}
                  error={errors?.studentError}
                />
                <I18nProvider locale="ru-RU">
                  <DateInput
                    label="Дата и время:"
                    labelPlacement="outside"
                    value={date}
                    onChange={setDate}
                    hideTimeZone
                    isInvalid={errors?.dateError}
                    className="max-w-xs"
                    errorMessage={
                      errors?.dateError && "Заполните дату и время урока"
                    }
                  />
                </I18nProvider>
                <Checkbox
                  className="hidden"
                  isSelected={lessonWas}
                  onValueChange={setLessonWas}
                >
                  Урок состоялся?
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Отмена
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleAddLesson();
                    onClose();
                  }}
                  isDisabled={!date || !student}
                  isLoading={loading}
                >
                  Добавить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LessonModal;
