import Schedule from "@/components/Schedule/Schedule";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Расписание репетитора — Стадизавр",
  description: "Просмотр расписания репетитора и доступных слотов.",
};

const TeacherSchedule = () => {
  return (
    <div>
      <h1 className="pageTitle">Раписание</h1>
      <Schedule />
    </div>
  );
};

export default TeacherSchedule;
