<template>
  <div class="pb-12">
    <p class="mb-2">Projects: {{ projects.length }}</p>
    <template v-if="projects.length">
      <div v-for="dateString of sortedDates" :key="dateString">
        <p class="mt-12">
          {{ dateString }}
        </p>
        <v-expansion-panels v-model="expandedProject" color="white">
          <ProjectCard
            v-for="project of datesProjectsMap[dateString]"
            :key="project.id"
            :project="project"
            :panel-unique-index="project.id + '_' + dateString"
          />
        </v-expansion-panels>
      </div>
    </template>
    <p v-else class="text-grey text-center">no projects to display</p>
  </div>
</template>

<script>
import { getProjectsList } from "@/services/firestore";
import ProjectCard from "./ProjectCard.vue";

export default {
  components: {
    ProjectCard,
  },
  data() {
    return {
      projects: [],
      expandedProject: undefined,
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
  async mounted() {
    this.projects = await getProjectsList();
  },
};
</script>
