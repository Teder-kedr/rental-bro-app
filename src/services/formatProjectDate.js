import format from "date-fns/format";

export function formatProjectDate(data) {
  if (Array.isArray(data)) return data;
  if (data.start && data.end) {
    const daysArray = [];
    const currentDate = new Date(data.start);

    while (currentDate <= data.end) {
      daysArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysArray.map((date) => format(date, "yyyy-MM-dd"));
  }
  return [format(data, "yyyy-MM-dd")];
}
