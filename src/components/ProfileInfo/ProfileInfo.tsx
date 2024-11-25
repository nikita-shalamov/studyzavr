import { Button, Input } from "@nextui-org/react";
import styles from "./profileInfo.module.scss";
import useUserProfileData from "@/hooks/useUserProfileData";
import { useUserStore } from "@/store/useUserStore";
import Spinner from "../loader/Spinner";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import updateData from "@/services/user/updateData.service";
import useUpdatePassword from "@/hooks/useUpdatePassword";
import { validatePassword } from "@/helpers/validateLoginData";

const ProfileInfo = () => {
  const { user } = useUserStore();
  const { data, isLoading, isError } = useUserProfileData(
    user?.userId as string
  );

  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { loading, success, error, updatePasswordFunc } = useUpdatePassword();

  useEffect(() => {
    if (data) {
      setName(data.name);
    }
  }, [data]);

  const updateDataFunc = debounce((userId, updatedName) => {
    updateData(userId, { name: updatedName, image: null });
  }, 300);

  const handlePasswordUpdate = () => {
    setPasswordError("");
    if (newPassword !== confirmPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }
    if (oldPassword === newPassword) {
      setPasswordError("Пароли одинаковые!");
      return;
    }
    if (validatePassword(newPassword) !== true) {
      setPasswordError("Минимум 8 символов");
      return;
    }
    if (user?.userId) {
      updatePasswordFunc(user.userId, { oldPassword, newPassword });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    data && (
      <div className={styles.container}>
        <div>
          <h2 className={styles.subtitle}>Имя и фамилия</h2>
          <Input
            size="md"
            className="max-w-[250px]"
            value={name}
            onChange={(e) => {
              const updatedName = e.target.value;
              setName(updatedName);
              if (user?.userId) {
                updateDataFunc(user.userId, updatedName);
              }
            }}
          />
        </div>
        <div>
          <h2 className={styles.subtitle}>Телефон</h2>
          <Input
            size="md"
            className="max-w-[250px]"
            value={data.phoneNumber}
            isDisabled
          />
        </div>
        <div>
          <h2 className={styles.subtitle}>Изменить пароль</h2>
          <div className="flex gap-3 flex-wrap">
            <Input
              size="md"
              className="max-w-[250px]"
              label="Старый пароль"
              placeholder="********"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
              size="md"
              className="max-w-[250px]"
              label="Новый пароль"
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              size="md"
              className="max-w-[250px]"
              label="Подтвердите пароль"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {passwordError && (
            <div className="text-red-500 mt-2 text-sm">{passwordError}</div>
          )}
          {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
          {success && (
            <div className="text-green-500 mt-2 text-sm">
              Пароль успешно изменен
            </div>
          )}
        </div>
        <div>
          <Button
            color="primary"
            isLoading={loading}
            onPress={handlePasswordUpdate}
            isDisabled={
              loading ||
              oldPassword === "" ||
              newPassword === "" ||
              confirmPassword === ""
            }
          >
            Изменить пароль
          </Button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
