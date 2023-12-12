import { getDayOfYear, getYear } from "date-fns";

export const dateToJulian = (date: Date): string => {
  const dayOfYear = getDayOfYear(date).toString().padStart(3, "0");
  const year = getYear(date).toString().slice(2, 4);

  return year + dayOfYear;
};
