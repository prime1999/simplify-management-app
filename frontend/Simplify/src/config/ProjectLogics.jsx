import { formatDistance, format } from "date-fns";

export const getFullDate = (targetDate) => {
  const formatedDate = format(new Date(targetDate), "MMM dd, yyyy");

  return formatedDate;
};
