"use client";

import { useState } from "react";
import moment from "moment-timezone";
import ScheduleDates from "@/components/ScheduleDates/student/ScheduleDates";
import SchedulePagination from "@/components/SchedulePagination/SchedulePagination";

const StudentSchedule = () => {
  moment.locale("ru");
  const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());

  return (
    <div>
      <h1 className="pageTitle">Расписание</h1>
      <div className="flex justify-start items-center mb-3">
        <SchedulePagination
          currentDate={currentDate}
          setDate={setCurrentDate}
        />
      </div>
      <ScheduleDates currentDate={currentDate} />
    </div>
  );
};

export default StudentSchedule;
