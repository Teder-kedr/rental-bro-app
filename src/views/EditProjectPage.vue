<template>
  <div>
    <ProjectForm v-if="project" :project-to-edit="project" @submit="submit" />
    <ContentLoader v-else class="mt-4" />
  </div>
</template>

<script>
import { getSingleProject, editProject } from "@/services/firestore";
import ProjectForm from "@/components/projects/form/ProjectForm.vue";
import ContentLoader from "@/components/ContentLoader.vue";

export default {
  components: {
    ProjectForm,
    ContentLoader,
  },
  data() {
    return {
      project: null,
    };
  },
  methods: {
    async submit(form) {
      await editProject(this.$route.params.id, form);
      this.$router.push("/projects");
    },
  },
  async created() {
    this.project = await getSingleProject(this.$route.params.id);
  },
};
</script>
