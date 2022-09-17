import { parseISO, setYear } from "date-fns";

export const getFutureDate = (date: string): Date => {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
};
