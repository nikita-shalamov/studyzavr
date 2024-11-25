import { DateTime } from "luxon";

export const toISODate = (dateString: string): string => {
  const utcDate = DateTime.fromISO(dateString).toUTC().toISO();
  return String(utcDate);
};

export const fromISODate = (dateString: string) => {
  const localDate = DateTime.fromISO(dateString, { zone: "local" });
  const formattedDate = localDate.toISO({
    includeOffset: true,
    extendedZone: true,
  });
  return formattedDate;
};
