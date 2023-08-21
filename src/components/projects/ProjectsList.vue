<template>
  <div v-if="isLoaded" class="pb-12">
    <p class="my-date-text mb-2">Filters:</p>
    <v-btn flat class="mb-4">
      {{ archiveFilter + " projects" }}
      <template #append>
        <v-icon>
          {{ archiveFilter === "upcoming" ? "mdi-arrow-up" : "mdi-arrow-down" }}
        </v-icon>
      </template>

      <v-menu activator="parent">
        <v-list>
          <v-list-item @click="archiveFilter = 'upcoming'">
            <v-list-item-title>Upcoming</v-list-item-title>
          </v-list-item>
          <v-list-item @click="archiveFilter = 'archived'">
            <v-list-item-title>Archived</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>

    <template v-if="selectedList.length">
      <div v-for="dateString of selectedList" :key="dateString" class="mb-12">
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
    <p v-else class="text-grey text-center">no projects to display</p>
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
    datesUpcoming() {
      const sorted = Object.keys(this.datesProjectsMap).sort((a, b) =>
        a.localeCompare(b)
      );
      return sorted.filter(
        (dateString) => dateString >= format(new Date(), "yyyy-MM-dd")
      );
    },
    datesArchived() {
      const sorted = Object.keys(this.datesProjectsMap).sort((a, b) =>
        b.localeCompare(a)
      );
      return sorted.filter(
        (dateString) => dateString < format(new Date(), "yyyy-MM-dd")
      );
    },
    selectedList() {
      if (this.archiveFilter === "archived") return this.datesArchived;
      return this.datesUpcoming;
    },
    isScreenSmall() {
      return !this.$vuetify.display.smAndUp;
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
    try {
      this.projects = await getProjectsList();
    } catch (error) {
      this.$store.dispatch("handleNewError", error.message);
    } finally {
      this.isLoaded = true;
    }
  },
};
</script>

<style scoped>
.my-date-text {
  color: grey;
  font-weight: 500;
}
</style>
