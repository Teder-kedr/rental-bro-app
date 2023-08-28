<template>
  <div>
    <h1 class="mb-4">{{ $t("projects.title") }}</h1>
    <v-btn
      flat
      color="primary"
      class="mb-4"
      to="new-project"
      prepend-icon="mdi-plus"
    >
      {{ $t("projects.newProject") }}
    </v-btn>
    <ProjectsList />
  </div>
</template>

<script>
import ProjectsList from "@/components/projects/ProjectsList.vue";

export default {
  components: { ProjectsList },
};
</script>
