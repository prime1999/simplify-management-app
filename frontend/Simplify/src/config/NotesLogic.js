import { formatDistance, format } from "date-fns";

export const getTimeDiff = (targetDate) => {
  const formatedTIme = formatDistance(new Date(targetDate), new Date(), {
    addSuffix: true,
  });

  return formatedTIme;
};
