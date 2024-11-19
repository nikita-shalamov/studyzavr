interface getWeekDaysData {
  dayName: string;
  dayNumber: number;
  fullDate: Date;
}

export const getMonday = (date: Date): Date => {
  const monday = new Date(date);
  const day = monday.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  monday.setDate(monday.getDate() + diff);
  console.log(monday);

  return monday;
};

export const getWeekDays = (date: Date): getWeekDaysData[] => {
  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const monday = getMonday(date);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);

    return {
      dayName: daysOfWeek[i],
      dayNumber: day.getDate(),
      fullDate: day,
    };
  });
};
