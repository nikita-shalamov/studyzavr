import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  DateInput,
  Checkbox,
  ModalFooter,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { useEffect, useState } from "react";
import styles from "./changeLessonModal.module.scss";
import StudentSelector from "../studentSelector/StudentSelector";
import { toISODate } from "@/helpers/date/ToAndFromISO";
import { useUserStore } from "@/store/useUserStore";
import { parseAbsoluteToLocal } from "@internationalized/date";
import useLesson from "@/hooks/lessons/useLesson";

interface ChangeLessonModalProps {
  lesson: {
    student: { name: string; id: string };
    lessonDate: string;
    id: number;
    lessonWas: boolean;
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ErrorTypes {
  studentError: boolean;
  dateError: boolean;
}

const ChangeLessonModal = ({
  lesson,
  isOpen,
  onOpenChange,
}: ChangeLessonModalProps) => {
  const [student, setStudent] = useState<string | undefined>(lesson.student.id);
  const [errors, setErrors] = useState<ErrorTypes | null>(null);
  const { user } = useUserStore((state) => state);
  const [lessonWas, setLessonWas] = useState(lesson.lessonWas);
  const [date, setDate] = useState(parseAbsoluteToLocal(lesson.lessonDate));
  const [changedData, setChangedData] = useState(false);
  const { deleteLessonFunc, updateLessonFunc } = useLesson();

  useEffect(() => {
    if (!date || !student) {
      setErrors({
        studentError: !student,
        dateError: !date,
      });
      return;
    }

    setErrors(null);

    setChangedData(
      toISODate(String(date)) !== lesson.lessonDate ||
        student !== lesson.student.id ||
        lessonWas !== lesson.lessonWas
    );
  }, [student, date, lessonWas]);

  const handleChangeLesson = () => {
    const lessonDate = toISODate(String(date));
    const studentId = String(student);

    if (user?.userId) {
      updateLessonFunc(String(lesson.id), user.userId, {
        lessonDate,
        studentId,
        lessonWas,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className={styles.modalHeader}>Изменить урок</ModalHeader>
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
              className="max-w-xs"
              value={date}
              onChange={setDate}
              hideTimeZone
              isInvalid={errors?.dateError}
              errorMessage={errors?.dateError && "Заполните дату и время урока"}
            />
          </I18nProvider>
          <Checkbox
            className="hidden"
            isSelected={lessonWas}
            onValueChange={setLessonWas}
          >
            Урок состоялся?
          </Checkbox>
          <Popover placement="bottom">
            <PopoverTrigger>
              <button className={styles.deleteButton}>Удалить урок</button>
            </PopoverTrigger>
            <PopoverContent className="p-2 flex gap-4 flex-row">
              <button
                className={styles.deleteButton}
                onClick={() => {
                  onOpenChange(false);
                  if (user?.userId) {
                    deleteLessonFunc(String(lesson.id), user.userId);
                  }
                }}
              >
                Подтвердить
              </button>
            </PopoverContent>
          </Popover>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={() => onOpenChange(false)}
          >
            Отмена
          </Button>
          <Button
            color="primary"
            onPress={() => {
              handleChangeLesson();
              onOpenChange(false);
            }}
            isDisabled={!changedData}
          >
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangeLessonModal;
