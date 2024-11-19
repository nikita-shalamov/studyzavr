import parsePhoneNumberFromString from "libphonenumber-js";

export const formatPhoneNumber = (phoneNumber: string): string => {
  return String(parsePhoneNumberFromString(phoneNumber, "RU")?.number);
};
