<template>
  <div class="pb-12">
    <p class="mb-2">Projects: {{ projects.length }}</p>
    <v-btn flat color="primary" prepend-icon="mdi-plus"> New Project </v-btn>
    <div
      v-for="(projectsArray, dateString) in datesProjectsMap"
      :key="dateString"
    >
      <p class="mt-12">
        {{ dateString }}
      </p>
      <v-expansion-panels v-model="expandedProject">
        <ProjectCard
          v-for="project of projectsArray"
          :key="project.id"
          :project="project"
          :panel-unique-index="project.id + '_' + dateString"
        />
      </v-expansion-panels>
    </div>
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
  },
  async mounted() {
    this.projects = await getProjectsList();
  },
};
</script>
