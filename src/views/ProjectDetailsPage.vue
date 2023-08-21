<template>
  <div v-if="project">
    <h1>{{ project.title }}</h1>

    <p class="mt-2">
      <span class="detail-title">
        Date: <em>{{ daysCountText }}</em>
      </span>
      <br />
      {{ datesText }}
    </p>

    <ProjectDetailsText :project="project" />

    <ProjectGearTable :project="project" />

    <div class="mt-12 d-flex flex-wrap justify-space-between">
      <v-btn
        flat
        variant="text"
        color="error"
        :loading="isAwaitingDelete"
        @click="handleDelete"
      >
        Delete project
        <template #prepend>
          <v-icon size="small">mdi-trash-can-outline</v-icon>
        </template>
      </v-btn>
      <v-btn
        class="ms-2"
        flat
        variant="text"
        :to="'/edit-project/' + $route.params.id"
      >
        Edit
        <template #prepend>
          <v-icon size="small">mdi-pencil</v-icon>
        </template>
      </v-btn>
    </div>

    <ConfirmDeletePopup
      v-model="isConfirmPopup"
      :itemToDelete="project.title"
      @close="isConfirmPopup = false"
      @confirm="handleConfirmDelete"
    />
  </div>
  <ContentLoader v-else class="mt-4" />
</template>

<script>
import { format, parseISO } from "date-fns";
import ru from "date-fns/locale/ru";
import { getSingleProject, deleteProject } from "@/services/firestore";
import ContentLoader from "@/components/ContentLoader.vue";
import ConfirmDeletePopup from "@/components/ConfirmDeletePopup.vue";
import ProjectDetailsText from "@/components/projects/ProjectDetailsText.vue";
import ProjectGearTable from "@/components/projects/ProjectGearTable.vue";

export default {
  components: {
    ContentLoader,
    ConfirmDeletePopup,
    ProjectDetailsText,
    ProjectGearTable,
  },
  data() {
    return {
      isConfirmPopup: false,
      project: null,
      isAwaitingDelete: false,
    };
  },
  computed: {
    datesText() {
      const locale = this.$vuetify.locale.current === "ru" ? ru : undefined;

      if (this.project.dates.length === 1) {
        return format(parseISO(this.project.dates[0]), "PPPP", {
          locale: locale,
        });
      }

      return (
        format(parseISO(this.project.dates[0]), "PPPP", {
          locale: locale,
        }) +
        " - " +
        format(parseISO(this.project.dates.at(-1)), "PPPP", {
          locale: locale,
        })
      );
    },
    daysCountText() {
      if (this.project.dates.length === 1) return "";
      return `(days total: ${this.project.dates.length})`;
    },
  },
  methods: {
    handleDelete() {
      this.isConfirmPopup = true;
    },
    async handleConfirmDelete() {
      this.isConfirmPopup = false;
      this.isAwaitingDelete = true;
      await deleteProject(this.$route.params.id);
      this.$router.push("/projects");
    },
  },
  async created() {
    this.project = await getSingleProject(this.$route.params.id);
  },
};
</script>

<style scoped>
.detail-title {
  font-weight: 500;
  color: grey;
}
</style>
