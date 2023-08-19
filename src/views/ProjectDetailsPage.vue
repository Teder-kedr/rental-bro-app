<template>
  <div v-if="project">
    <h1>{{ project.title }}</h1>

    <p class="mt-2">
      <span class="detail-title"
        >Date: <em>{{ daysCount }}</em></span
      ><br />
      {{ displayedDates }}
    </p>

    <div class="mt-4">
      <p v-if="project.details.engineer" class="mb-2">
        <span class="detail-title">Engineer:</span><br />
        {{ project.details.engineer.name }}
        <span v-if="project.details.engineer.tel" class="text-tel">{{
          project.details.engineer.tel
        }}</span>
      </p>

      <p v-if="project.details.helpers.length" class="mb-2">
        <span class="detail-title">Helpers: </span><br />
        <span v-for="(person, idx) of project.details.helpers" :key="idx">
          {{ person.name }}
          <span v-if="person.tel" class="text-tel">{{ person.tel }}</span
          ><span v-if="idx !== project.details.helpers.length - 1"><br /></span>
        </span>
      </p>

      <p v-if="project.details.contacts.length" class="mb-2">
        <span class="detail-title">Contacts: </span><br />
        <span v-for="(person, idx) of project.details.contacts" :key="idx">
          <span v-if="person.name"> {{ person.name + " " }} </span>
          <span v-if="person.tel" class="text-tel"> {{ person.tel }} </span>
          <span v-if="person.role"> ({{ person.role }}) </span
          ><span v-if="project.details.contacts.length > 1"><br /></span>
        </span>
      </p>

      <p v-if="project.details.location" class="mb-2">
        <span class="detail-title">Location: </span><br />
        <span class="text-loc">{{ project.details.location }}</span>
      </p>

      <p v-if="project.details.notes" class="my-notes">
        <span class="detail-title">Notes:</span><br />
        {{ project.details.notes }}
      </p>
    </div>

    <v-container class="pa-0 my-8">
      <v-row v-for="item of project.gearList" :key="item.id">
        <v-col cols="12" md="6">
          <span style="font-weight: 500">{{ item.model }}</span>
        </v-col>
        <v-col
          cols="4"
          md="2"
          :class="{ 'text-right': $vuetify.display.mdAndUp }"
        >
          {{ item.priceday }} ₽
        </v-col>
        <v-col
          cols="4"
          md="2"
          :class="{
            'text-right': $vuetify.display.mdAndUp,
            'text-center': $vuetify.display.smAndDown,
          }"
        >
          {{ item.qty }} pcs.
        </v-col>
        <v-col cols="4" md="2" class="text-right">
          = {{ item.priceday * item.qty }} ₽
        </v-col>
        <v-col>
          <v-divider />
        </v-col>
      </v-row>
      <v-row v-for="item of project.extras" :key="item.id">
        <v-col cols="12" md="6">
          <span style="font-weight: 500">{{ item.name }}</span>
        </v-col>
        <v-col
          cols="4"
          md="2"
          :class="{ 'text-right': $vuetify.display.mdAndUp }"
        >
          {{ item.price ? item.price + " ₽" : "-" }}
        </v-col>
        <v-col
          cols="4"
          md="2"
          :class="{
            'text-right': $vuetify.display.mdAndUp,
            'text-center': $vuetify.display.smAndDown,
          }"
        >
          {{ item.qty ? "* " + item.qty : "-" }}
        </v-col>
        <v-col cols="4" md="2" class="text-right">
          {{ item.price ? "= " + item.price * (item.qty || 1) + " ₽" : "-" }}
        </v-col>
        <v-col>
          <v-divider />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <p>Total:</p>
        </v-col>
        <v-col cols="6">
          <p class="text-right">{{ allItemsTotal }} ₽</p>
        </v-col>
      </v-row>
    </v-container>

    <div class="mt-12 d-flex flex-wrap justify-space-between">
      <v-btn flat variant="outlined" color="error" @click="handleDelete">
        Delete project
        <template #prepend>
          <v-icon size="small">mdi-trash-can-outline</v-icon>
        </template>
      </v-btn>
      <v-btn class="ms-2" flat variant="outlined">
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

export default {
  components: { ContentLoader, ConfirmDeletePopup },
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
    allItemsTotal() {
      return (
        this.project.gearList.reduce(
          (acc, item) => item.priceday * item.qty + acc,
          0
        ) +
        this.project.extras.reduce(
          (acc, item) => (item.price || 0) * (item.qty || 1) + acc,
          0
        )
      );
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
.text-tel,
.text-loc {
  font-weight: 500;
}
.text-tel:hover,
.text-loc:hover {
  text-decoration: underline;
  cursor: pointer;
}

.my-notes {
  font-weight: bold;
  white-space: pre-line;
}
</style>
