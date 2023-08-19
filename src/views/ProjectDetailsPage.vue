<template>
  <div v-if="project">
    <h1>{{ project.title }}</h1>

    <p class="mt-2">
      <span class="detail-title">
        Date: <em>{{ daysCount }}</em>
      </span>
      <br />
      {{ displayedDates }}
    </p>

    <ProjectDetailsText :project="project" />

    <ProjectGearTable :project="project" />

    <div class="mt-12 d-flex flex-wrap justify-space-between">
      <v-btn flat variant="text" color="error" @click="handleDelete">
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
    />
  </div>
  <ContentLoader v-else class="mt-4" />
</template>

<script>
import { format, parseISO } from "date-fns";
import ru from "date-fns/locale/ru";
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
      project: {
        title: "Interview scene",
        dates: ["2023-08-15", "2023-08-16"],
        details: {
          notes: "Don't forget batteries\nPassport is required!",
          location: "Bolshaya Novodmitrovskaya, 2",
          contacts: [
            { name: "Oleg", role: "producer", tel: "+79121234567" },
            { role: "admin", tel: "+79121234567" },
          ],
          engineer: { name: "Mikhail", tel: "+79998463971" },
          helpers: [
            { name: "Zhenya", tel: "+79998463971" },
            { name: "Zhenya", tel: "+79998463971" },
          ],
        },
        gearList: [
          {
            model: "Sennheiser EW 122P-G3 (rx)",
            type: "wireless",
            priceday: 400,
            qty: 4,
            id: "VMQGWB0Wjcek6n72xMhj",
          },
          {
            model: "Sennheiser EW 122P-G3 (tx)",
            type: "wireless",
            priceday: 400,
            qty: 4,
            id: "ZJKF1jXMQgFdzbJ75xcD",
          },
          {
            model: "Sennheiser MKE-2 Gold",
            type: "lavalier mic",
            priceday: 650,
            qty: 3,
            id: "on6BJWf0ykE1nH93KSRZ",
          },
          {
            model: "Zoom F8",
            type: "field recorder",
            priceday: 1700,
            qty: 4,
            id: "r2XGcN1FbqMkuyP5hEHT",
          },
        ],
        extras: [
          {
            name: "Engineer",
            price: 8000,
          },
          {
            name: "Lighting equipment",
            qty: 2,
            price: 1000,
          },
        ],
        id: "12345",
      },
    };
  },
  computed: {
    displayedDates() {
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
    daysCount() {
      if (this.project.dates.length === 1) return "";
      return `(days total: ${this.project.dates.length})`;
    },
  },
  methods: {
    handleDelete() {
      this.isConfirmPopup = true;
    },
  },
};
</script>

<style scoped>
.detail-title {
  font-weight: 500;
  color: grey;
}
</style>
