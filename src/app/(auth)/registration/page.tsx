import Registration from "@/components/auth/registration/Registration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация — Стадизавр",
  description:
    "Зарегистрируйтесь на платформе Стадизавр и начните работать с репетиторами и учениками.",
};

const RegistrationPage = () => {
  return <Registration />;
};

export default RegistrationPage;
