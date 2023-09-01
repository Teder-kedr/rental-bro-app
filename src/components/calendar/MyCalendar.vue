<template>
  <div class="wrapper">
    <header
      class="d-flex flex-column flex-sm-row justify-sm-space-between align-start align-sm-center flex-wrap"
    >
      <p class="header__title pe-6 pb-2">{{ headerTitleText }}</p>
      <div class="pb-2">
        <v-btn flat class="me-2" @click="nav = 0">
          {{ $t("calendar.today") }}
        </v-btn>
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
        :is-selected="dayToDateString(day) === selectedCell"
        :events="datesProjectsMap[dayToDateString(day)]"
        @click="selectedCell = dayToDateString(day)"
      />
      <div v-for="n in trailingCellsCount" :key="n" class="empty-cell" />
    </ul>
  </div>

  <div v-if="selectedCell" class="pb-8">
    <p class="my-date-text my-4">
      {{ selectedCell.split("-").reverse().join("-") }}
    </p>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="project of selectedDayProjects"
        :key="project.id"
        elevation="0"
      >
        <ProjectCard :project="project" />
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="py-4 d-flex justify-center align-center">
      <v-btn
        flat
        variant="text"
        prepend-icon="mdi-plus"
        :to="{ path: '/new-project', query: { date: selectedCell } }"
      >
        {{ $t("calendar.create") }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import MyCalCell from "./MyCalCell.vue";
import useCalendar from "./useCalendar";
import { monthlyProjectsGetter } from "@/services/calendarApi";
import { watch } from "vue";
import ProjectCard from "../projects/card/ProjectCard.vue";

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

const projects = ref([]);
const getMonthlyProjects = monthlyProjectsGetter();
onMounted(async () => {
  projects.value = await getMonthlyProjects(navYear.value, navMonthStr.value);
});

const selectedCell = ref(null);

watch(nav, async (newValue, oldValue) => {
  selectedCell.value = null;
  if (newValue > oldValue) {
    projects.value = await getMonthlyProjects(
      navYear.value,
      navMonthStr.value,
      true
    );
  } else {
    projects.value = await getMonthlyProjects(navYear.value, navMonthStr.value);
  }
});

const datesProjectsMap = computed(() => {
  const result = {};
  projects.value.forEach((project) => {
    project.dates.forEach((date) => {
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(project);
    });
  });
  return result;
});

const selectedDayProjects = computed(() => {
  return datesProjectsMap.value[selectedCell.value] || [];
});

function next() {
  nav.value++;
}
function prev() {
  nav.value--;
}

function isToday(displayedDay) {
  return dayToDateString(displayedDay) === todayString;
}

function dayToDateString(
  displayedDay,
  year = navYear.value,
  month = navMonthStr.value
) {
  return `${year}-${month}-${String(displayedDay).padStart(2, "0")}`;
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
.my-date-text {
  color: grey;
  font-weight: 500;
}
</style>
