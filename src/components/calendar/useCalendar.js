import { format } from "date-fns";
import { computed, ref } from "vue";

export default function useCalendar(locale) {
  const WEEKDAYS_EN = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const WEEKDAYS_RU = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const MONTHS_EN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const MONTHS_RU = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const TODAY = new Date();
  const todayString = format(TODAY, "yyyy-MM-dd");

  const nav = ref(0);

  const navDate = computed(() => {
    const result = new Date(TODAY);
    result.setMonth(result.getMonth() + nav.value, 1);
    // first day of current month
    return result;
  });
  const navYear = computed(() => {
    return navDate.value.getFullYear();
  });
  const navMonth = computed(() => {
    return navDate.value.getMonth();
    // zero based
  });
  const navMonthStr = computed(() => {
    return String(navMonth.value + 1).padStart(2, "0");
    // 1-based
  });

  const weekdaysText = computed(() => {
    if (locale === "ru") return WEEKDAYS_RU;
    else return WEEKDAYS_EN;
  });

  const headerTitleText = computed(() => {
    if (locale === "ru") return MONTHS_RU[navMonth.value] + " " + navYear.value;
    else return MONTHS_EN[navMonth.value] + " " + navYear.value;
  });

  const daysInMonth = computed(() => {
    return new Date(
      navDate.value.getFullYear(),
      navDate.value.getMonth() + 1,
      0
    ).getDate();
  });

  const leadingCellsCount = computed(() => {
    const firstDayOfMonth = new Date(navDate.value);
    if (locale === "en") return firstDayOfMonth.getDay();
    const result = firstDayOfMonth.getDay() - 1;
    if (result < 0) return 6;
    return result;
  });

  const trailingCellsCount = computed(() => {
    const remainder = (daysInMonth.value + leadingCellsCount.value) % 7;
    if (remainder === 0) {
      return 0;
    } else {
      return 7 - remainder;
    }
  });

  return {
    nav,
    navYear,
    navMonthStr,
    weekdaysText,
    headerTitleText,
    daysInMonth,
    leadingCellsCount,
    trailingCellsCount,
    todayString,
  };
}
