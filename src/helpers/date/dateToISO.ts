export const convertToISO = (dateObj: any): string => {
  const { year, month, day } = dateObj;
  const date = new Date(year, month - 1, day);
  return date.toISOString();
};
