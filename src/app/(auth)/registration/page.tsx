import RegistrationForm from "@/components/auth/registrationForm/RegistrationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация — Стадизавр",
  description:
    "Зарегистрируйтесь на платформе Стадизавр и начните работать с репетиторами и учениками.",
};

const RegistrationPage = () => {
  return <RegistrationForm />;
};

export default RegistrationPage;
