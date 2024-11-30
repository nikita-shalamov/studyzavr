import useGetLink from "@/hooks/useGetLink";
import useUpdateLink from "@/hooks/useUpdateLink";
import {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  Modal,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { remove } from "lodash";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

interface StudentCardSettingsProps {
  user: { userId: string } | null;
  id: number | undefined;
}

const StudentCardSettings = ({ user, id }: StudentCardSettingsProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useGetLink(String(id), user?.userId as string);
  const { updateLinkFunc } = useUpdateLink();

  const [link, setLink] = useState<null | string>("");

  useEffect(() => {
    if (data?.lessonLink) {
      setLink(data.lessonLink);
    }
  }, [data?.lessonLink]);

  return (
    <div className="flex flex-wrap items-center">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" isIconOnly size="md">
            <Image
              src={"/icons/settings.svg"}
              alt={"setting button"}
              width={20}
              height={20}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            onClick={() => redirect(`/teacher/homework/${id}`)}
            key="homework"
          >
            Домашнее задание
          </DropdownItem>
          <DropdownItem onClick={onOpen} key="zoom">
            Ссылка на урок
          </DropdownItem>
          <DropdownItem
            className={`text-danger`}
            key="delete"
            color="danger"
            onClick={() => {
              if (user && user.userId) {
                remove(user.userId, String(id));
              }
            }}
          >
            Убрать ученика
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Ссылка на урок</ModalHeader>
                <ModalBody>
                  <Input
                    placeholder="https://zoom.com/ru"
                    value={link || ""}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <div className="text-slate-500 font-medium text-sm">
                    *Ссылка будет отображаться у студента
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Отмена
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      onClose();
                      updateLinkFunc(String(id), user?.userId as string, link);
                    }}
                    isDisabled={link === data.lessonLink}
                  >
                    Сохранить
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default StudentCardSettings;
