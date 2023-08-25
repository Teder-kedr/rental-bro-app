<template>
  <ProjectForm
    v-if="isLoaded"
    :project-to-edit="projectToCopy"
    @submit="submit"
  />
  <ContentLoader v-else class="mt-4" />
</template>

<script>
import ProjectForm from "@/components/projects/form/ProjectForm.vue";
import ContentLoader from "@/components/ContentLoader.vue";
import { createProject, getSingleProject } from "@/services/firestore";

export default {
  components: {
    ProjectForm,
    ContentLoader,
  },
  data() {
    return {
      projectToCopy: null,
      isLoaded: true,
    };
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
  async created() {
    if (this.$route.params.id) {
      this.isLoaded = false;
      try {
        this.projectToCopy = await getSingleProject(this.$route.params.id);
        this.projectToCopy.id = null;
      } catch (error) {
        this.$store.dispatch("handleNewError", error.message);
      } finally {
        this.isLoaded = true;
      }
    }
  },
};
</script>
