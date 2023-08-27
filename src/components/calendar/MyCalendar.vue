<template>
  <div class="wrapper">
    <header
      class="d-flex flex-column flex-sm-row justify-sm-space-between align-start align-sm-center flex-wrap"
    >
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
      <li v-for="str of weekdaysText" :key="str" class="pe-1">{{ str }}</li>
    </ul>
    <ul class="grid">
      <div v-for="n in leadingCellsCount" :key="n" class="empty-cell" />
      <MyCalCell
        v-for="day of daysInMonth"
        :key="day"
        :day-num="day"
        :is-today="isToday(day)"
      />
      <div v-for="n in trailingCellsCount" :key="n" class="empty-cell" />
    </ul>
  </div>
</template>

<script setup>
import useCalendar from "./useCalendar";
import MyCalCell from "./MyCalCell.vue";

const props = defineProps({
  locale: {
    type: String,
    default: "en",
  },
});

const {
  nav,
  weekdaysText,
  headerTitleText,
  daysInMonth,
  leadingCellsCount,
  trailingCellsCount,
  todayString,
  navYear,
  navMonthStr,
} = useCalendar(props.locale);

function next() {
  nav.value++;
}
function prev() {
  nav.value--;
}

function isToday(displayedDay) {
  return (
    `${navYear.value}-${navMonthStr.value}-${String(displayedDay).padStart(
      2,
      "0"
    )}` === todayString
  );
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
  cursor: pointer;
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
