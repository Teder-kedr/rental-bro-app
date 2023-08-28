<template>
  <div v-if="isLoaded">
    <p class="my-date-text mb-2">{{ $t("projects.filters") }}:</p>
    <v-btn flat class="mb-4">
      {{
        archiveFilter === "archived"
          ? $t("projects.past")
          : $t("projects.upcoming")
      }}
      {{ $t("projects.title") }}
      <template #append>
        <v-icon>
          {{ archiveFilter === "upcoming" ? "mdi-arrow-up" : "mdi-arrow-down" }}
        </v-icon>
      </template>

      <v-menu activator="parent">
        <v-list>
          <v-list-item @click="archiveFilter = 'upcoming'">
            <v-list-item-title>{{
              $t("projects.upcomingProjects")
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="archiveFilter = 'archived'">
            <v-list-item-title>{{
              $t("projects.pastProjects")
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>

  <div v-if="isLoaded" class="pb-12">
    <template v-if="datesArrayFiltered.length">
      <div
        v-for="dateString of datesArrayFiltered"
        :key="dateString"
        class="mb-12"
      >
        <p class="mt-2 my-date-text">
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
    <p v-else class="text-grey text-center">{{ $t("projects.noProjects") }}</p>
  </div>
  <ContentLoader v-else class="mt-4" />
</template>

<script>
import { format, isToday, isTomorrow, isYesterday, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { getProjectsList } from "@/services/firestore";
import ProjectCard from "./card/ProjectCard.vue";
import ContentLoader from "@/components/ContentLoader.vue";

export default {
  components: {
    ProjectCard,
    ContentLoader,
  },
  data() {
    return {
      projects: [],
      expandedProjects: {},
      archiveFilter: "upcoming",
      isLoaded: false,
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
    datesArrayFiltered() {
      const result = Object.keys(this.datesProjectsMap);
      return result.filter(applyFilter(this.archiveFilter));

      function applyFilter(archiveFilter) {
        return (date) => {
          if (archiveFilter === "upcoming") {
            return date >= format(new Date(), "yyyy-MM-dd");
          } else {
            return date < format(new Date(), "yyyy-MM-dd");
          }
        };
      }
    },
    isScreenSmall() {
      return !this.$vuetify.display.smAndUp;
    },
  },
  watch: {
    archiveFilter(newValue) {
      this.fetchList(newValue);
    },
  },
  methods: {
    async fetchList(archiveFilter) {
      this.isLoaded = false;
      try {
        this.projects = await getProjectsList(archiveFilter);
      } catch (error) {
        this.$store.dispatch("handleNewError", error.message);
      } finally {
        this.isLoaded = true;
      }
    },
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
      } else if (isYesterday(date)) {
        return (
          (locale === ru ? "Вчера, " : "Yesterday, ") +
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
    await this.fetchList(this.archiveFilter);
  },
};
</script>

<style scoped>
.my-date-text {
  color: grey;
  font-weight: 500;
}
</style>
