<template>
  <p class="mb-2">Projects: {{ projects.length }}</p>
  <v-btn flat color="primary" prepend-icon="mdi-plus"> New Project </v-btn>
  <div v-for="date of Object.entries(projectsMappedToDates)" :key="date[1].id">
    <p class="mt-12">{{ date[0] }}</p>
    <v-expansion-panels>
      <project-card
        v-for="project of date[1]"
        :project="project"
        :key="project.id"
      />
    </v-expansion-panels>
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
      expanded: [],
    };
  },
  computed: {
    projectsMappedToDates() {
      const result = {};
      this.projects.forEach((project) => {
        for (let date of project.dates) {
          if (!result[date]) {
            result[date] = [];
          }
          result[date].push(project);
        }
      });
      return result;
    },
  },
  async mounted() {
    this.projects = await getProjectsList();
  },
};
</script>
