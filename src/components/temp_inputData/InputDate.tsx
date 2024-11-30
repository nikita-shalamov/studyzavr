"use client";

import { useEffect, useState } from "react";
import { DateInput } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import { convertToISO } from "@/helpers/date/dateToISO";

interface InputDataProps {
  setDateState: (newDate: string) => void;
  width?: string;
}

export default function InputData({ setDateState, width }: InputDataProps) {
  const [date, setDate] = useState(today(getLocalTimeZone()));

  useEffect(() => {
    setDateState(convertToISO(date));
  }, [date]);

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="ru-RU">
        <DateInput
          label="Дата"
          value={date as any}
          onChange={handleDateChange}
          hideTimeZone
          className={`${width}`}
          fullWidth={width ? false : true}
          variant="flat"
          labelPlacement="outside"
        />
      </I18nProvider>
    </div>
  );
}
