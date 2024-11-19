export const convertToISO = (dateObj: any): string => {
  const { year, month, day } = dateObj;
  const date = new Date(year, month - 1, day); // month - 1, так как месяцы в JavaScript от 0 до 11
  return date.toISOString(); // Преобразование в ISO 8601
};
