<template>
  <div v-if="project">
    <h1>{{ project.title }}</h1>

    <p class="mt-2">
      <span class="detail-title">
        {{ $t("projects.form.date") }}: <em>{{ daysCountText }}</em>
      </span>
      <br />
      {{ datesText }}
    </p>

    <ProjectDetailsText :project="project" />

    <ProjectGearTable
      :project="project"
      :availability-map="availabilityMap"
      :my-inventory="myInventory"
    />

    <div
      class="my-full-width mt-8 pb-4 d-flex flex-column align-end flex-sm-row align-sm-center flex-wrap"
    >
      <v-btn
        class="mb-1"
        flat
        variant="text"
        color="error"
        :loading="isAwaitingDelete"
        @click="handleDelete"
      >
        {{ $t("projects.deleteProject") }}
        <template #prepend>
          <v-icon size="small">mdi-trash-can-outline</v-icon>
        </template>
      </v-btn>
      <v-btn
        class="mb-1 ms-sm-auto"
        flat
        variant="text"
        :loading="isAwaitingDelete"
        :to="'/new-project/' + $route.params.id"
      >
        {{ $t("projects.copy") }}
        <template #prepend>
          <v-icon size="small">mdi-content-copy</v-icon>
        </template>
      </v-btn>
      <v-btn
        class="mb-1"
        flat
        variant="text"
        :loading="isAwaitingDelete"
        :to="'/edit-project/' + $route.params.id"
      >
        {{ $t("projects.edit") }}
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
import {
  getSingleProject,
  deleteProject,
  getGearList,
} from "@/services/firestore";
import { getAvailabilityMap } from "@/services/gearAvailable";
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
      availabilityMap: {},
      myInventory: [],
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
      return `(${this.$t("projects.daysTotal")}: ${this.project.dates.length})`;
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
    try {
      this.project = await getSingleProject(this.$route.params.id);
      this.myInventory = await getGearList();
      this.availabilityMap = await getAvailabilityMap(
        this.myInventory,
        this.project.dates,
        this.project.id
      );
    } catch (error) {
      this.$store.dispatch("handleNewError", error.message);
    }
  },
};
</script>

<style scoped>
.detail-title {
  font-weight: 500;
  color: grey;
}
.my-full-width {
  width: 100%;
}
</style>
