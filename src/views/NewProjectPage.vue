<template>
  <ProjectForm @submit="submit" />
</template>

<script>
import ProjectForm from "@/components/projects/form/ProjectForm.vue";
import { createProject } from "@/services/firestore";

export default {
  components: {
    ProjectForm,
  },
  methods: {
    async submit(form) {
      await createProject(form);
      this.$router.push("projects");
    },
  },
};
</script>
