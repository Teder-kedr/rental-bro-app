<template>
  <div class="pb-12">
    <template v-if="projects.length">
      <div v-for="dateString of sortedDates" :key="dateString">
        <p class="mt-12 my-date-text">
          {{ formatDateString(dateString) }}
        </p>
        <v-expansion-panels
          v-model="expandedProjects[dateString]"
          multiple
          color="white"
        >
          <v-expansion-panel
            v-for="project of datesProjectsMap[dateString]"
            :key="project.id"
            class="my-2"
            :value="project.id + '_' + dateString"
          >
            <ProjectCard :project="project" />
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </template>
    <p v-else class="text-grey text-center">no projects to display</p>
  </div>
</template>

<script>
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { getProjectsList } from "@/services/firestore";
import ProjectCard from "./ProjectCard.vue";

export default {
  components: {
    ProjectCard,
  },
  data() {
    return {
      projects: [],
      expandedProjects: {},
    };
  },
  computed: {
    datesProjectsMap() {
      const result = {};
      this.projects.forEach((project) => {
        project.dates.forEach((date) => {
          if (!result[date]) {
            result[date] = [];
          }
          result[date].push(project);
        });
      });
      return result;
    },
    sortedDates() {
      return Object.keys(this.datesProjectsMap).sort((a, b) =>
        a.localeCompare(b)
      );
    },
  },
  methods: {
    formatDateString(str) {
      const locale = this.$vuetify.locale.current === "ru" ? ru : undefined;
      const date = parseISO(str);
      if (isToday(date)) {
        return (
          (locale === ru ? "Сегодня, " : "Today, ") +
          format(date, "dd MMM yyyy", {
            locale: locale,
          })
        );
      } else if (isTomorrow(date)) {
        return (
          (locale === ru ? "Завтра, " : "Tomorrow, ") +
          format(date, "dd MMM yyyy", {
            locale: locale,
          })
        );
      } else {
        return format(date, "eeee, dd MMM yyyy", {
          locale: locale,
        });
      }
    },
  },
  async mounted() {
    this.projects = await getProjectsList();
  },
};
</script>

<style scoped>
.my-date-text {
  color: grey;
  font-weight: 500;
}
</style>
