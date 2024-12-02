import LoginForm from "@/components/auth/login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход — Стадизавр",
  description:
    "Войдите в ваш аккаунт на платформе Стадизавр для репетиторов и учеников.",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
