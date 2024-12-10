import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Стадизавр — Сервис для репетиторов и учеников",
  description:
    "Платформа для репетиторов и учеников: домашние задания, расписание, взаимодействие.",
  openGraph: {
    title: "Стадизавр — Сервис для репетиторов и учеников",
    description:
      "Платформа для репетиторов и учеников: домашние задания, расписание, взаимодействие.",
    url: "https://studyzavr.ru",
    siteName: "Стадизавр",
    images: [
      {
        url: "/images/logo-mini.png", // логотип для Open Graph
        width: 800,
        height: 600,
        alt: "Логотип Стадизавр",
      },
      {
        url: "/favicons/favicon.ico", // фавикон для Open Graph
        width: 32,
        height: 32,
        alt: "Фавикон Стадизавр",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicons/android-chrome-512x512.png"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeButton
        />
      </body>
    </html>
  );
}
