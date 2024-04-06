import { format, parseISO } from "date-fns";

export const formatNumber = (number: number) => {
  if (number !== undefined) {
    return number.toLocaleString("en-US");
  }
};
export const formatDate = (date: string, pattern: string) => {
  return date ? format(parseISO(date), pattern) : ''
}
