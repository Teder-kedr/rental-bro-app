import { format } from "date-fns";

function getDatesBetween(start, end) {
  const result = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    result.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return result;
}

//for MyDatePicker
export function projectDatesIntoArray(data) {
  if (Array.isArray(data)) return data;
  if (data.start && data.end) {
    const datesArray = getDatesBetween(data.start, data.end);
    return datesArray.map((date) => format(date, "yyyy-MM-dd"));
  } else return [format(data, "yyyy-MM-dd")];
}

//for firestore
export function datesToServer(arr) {
  return { dateStart: arr[0], dateEnd: arr.at(-1), dates: null };
}
export function datesFromServer(dateStart, dateEnd) {
  const result = getDatesBetween(new Date(dateStart), new Date(dateEnd));
  const formattedResult = result.map((date) => format(date, "yyyy-MM-dd"));
  return { dates: formattedResult, dateStart: null, dateEnd: null };
}
