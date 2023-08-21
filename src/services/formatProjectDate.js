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

export function formatProjectDate(data) {
  if (Array.isArray(data)) return data;
  if (data.start && data.end) {
    const datesArray = getDatesBetween(data.start, data.end);
    return datesArray.map((date) => format(date, "yyyy-MM-dd"));
  } else return [format(data, "yyyy-MM-dd")];
}
