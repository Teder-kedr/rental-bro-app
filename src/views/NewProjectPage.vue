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
      try {
        await createProject(form);
        this.$router.push("/projects");
      } catch (error) {
        this.$store.dispatch("handleNewError", error.message);
      }
    },
  },
};
</script>
