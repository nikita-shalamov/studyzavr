"use client";

import { deleteSession } from "@/app/lib/session";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/modal";
import { redirect } from "next/navigation";

const TeacherProfile = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const clearUser = useUserStore((state) => state.clearUser);

  return (
    <div>
      <h1 className="pageTitle">Профиль</h1>

      <div>
        <Button onPress={onOpen} color="danger">
          Выйти из аккаунта
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Выйти из аккаунта?
                </ModalHeader>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Отмена
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      deleteSession();
                      clearUser();
                      redirect("/login");
                    }}
                    onPress={onClose}
                  >
                    Выйти
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

export default TeacherProfile;
