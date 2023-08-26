<template>
  <div class="wrapper">
    <header class="d-flex justify-space-between align-center flex-wrap">
      <p class="header__title pe-6 pb-2">{{ headerTitleText }}</p>
      <div class="pb-2">
        <v-btn flat class="me-2" @click="nav = 0">today</v-btn>
        <v-btn
          size="small"
          variant="text"
          icon="mdi-chevron-left"
          :disabled="nav <= -6"
          @click="prev"
          @dblclick.prevent
        />
        <v-btn
          size="small"
          variant="text"
          icon="mdi-chevron-right"
          :disabled="nav >= 6"
          @click="next"
          @dblclick.prevent
        />
      </div>
    </header>
    <ul class="weekdays">
      <li v-for="day of weekdaysNormal" :key="day" class="pe-1">{{ day }}</li>
    </ul>
    <ul class="grid">
      <div v-for="n in countEmptyCells" :key="n" class="empty-cell" />
      <MyCalCell
        v-for="day of daysInMonth"
        :key="day"
        :day-num="day"
        :is-today="nav === 0 && TODAY.getDate() === day"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MyCalCell from "./MyCalCell.vue";

const props = defineProps({
  locale: {
    type: String,
    default: "en",
  },
});

const WEEKDAYS_EN = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const WEEKDAYS_RU = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const weekdaysNormal = computed(() => {
  if (props.locale === "en") return WEEKDAYS_EN;
  else return WEEKDAYS_RU;
});
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
const headerTitleText = computed(() => {
  if (props.locale === "ru")
    return (
      MONTHS_RU[navDate.value.getMonth()] + " " + navDate.value.getFullYear()
    );
  else
    return (
      MONTHS_EN[navDate.value.getMonth()] + " " + navDate.value.getFullYear()
    );
});

const countEmptyCells = computed(() => {
  const firstDayOfMonth = new Date(navDate.value);
  if (props.locale === "en") return firstDayOfMonth.getDay();
  const result = firstDayOfMonth.getDay() - 1;
  if (result >= 0) return result;
  return 6;
});

const TODAY = new Date();

const navDate = computed(() => {
  const result = new Date(TODAY);
  result.setMonth(result.getMonth() + nav.value, 1);
  return result;
});

const daysInMonth = computed(() => {
  return new Date(
    navDate.value.getFullYear(),
    navDate.value.getMonth() + 1,
    0
  ).getDate();
});

const nav = ref(0);

function next() {
  nav.value++;
}
function prev() {
  nav.value--;
}
</script>

<style scoped>
li {
  list-style: none;
}
.wrapper {
  width: 100%;
}
.header__title {
  font-size: 1.25rem;
}
.weekdays {
  width: 100%;
  font-size: 0.9rem;
  border-bottom: 2px solid #ccc;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: right;
}
.grid {
  width: 100%;
  font-size: 0.9rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.empty-cell {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>
