import { formatDistance, format, parseISO } from "date-fns";

export const getFullDate = (targetDate) => {
  const formatedDate = format(new Date(targetDate), "MMM dd, yyyy");

  return formatedDate;
};

export const getDateToStart = (startDate) => {
  // get the start and end date of the project in a formatted way to present in the UI
  let start_date = parseISO(startDate);
   // store today's date in the formated date variable
   let formatedDate = format(new Date(), "yyyy-MM-dd");
   const today = parseISO(formatedDate);

   // get the time left to start the project by calc the distancebetween toady and the startdate variable above
   const difference = formatDistance(today, start_date);

    if(today === start_date){
      return 'today'
    }

    if(today > start_date){
      return `started ${difference} ago`
    }
    return `starts in ${difference}`
}

export const getDueDate = (startDate, endDate) => {
  // get the start and end date of the project in a formatted way to present in the UI
  let start_date = parseISO(startDate);
  let end_date = parseISO(endDate);

   // get the time left to end the project by calc the distancebetween endDate and the startdate variable above
   const difference = formatDistance(end_date, start_date);

    if(end_date === start_date){
      return 'today'
    }

    return difference
}

export const getCompletedDate = (endDate) => {
 // get the start and end date of the project in a formatted way to present in the UI
 let end_date = parseISO(endDate);
 // store today's date in the formated date variable
 let formatedDate = format(new Date(), "yyyy-MM-dd");
 const today = parseISO(formatedDate);

 // get the time the project ended by calc the distance between toady and the end_date variable above
 const difference = formatDistance(today, end_date);

  if(today === end_date){
    return 'today'
  }

  return difference
}
