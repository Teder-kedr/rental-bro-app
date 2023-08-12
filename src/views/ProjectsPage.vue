<template>
  <div>
    <h1 class="mb-4">{{ $t("projects.title") }}</h1>
    <ProjectsList />
  </div>
</template>

<script>
import ProjectsList from "@/components/ProjectsList.vue";

export default {
  components: { ProjectsList },
};
</script>
