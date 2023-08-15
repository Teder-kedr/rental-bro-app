<template>
  <v-container class="pa-0">
    <h1 class="mb-8">{{ title || "New project" }}</h1>
    <v-form>
      <p class="ma-1">Project title:</p>
      <v-text-field
        v-model="title"
        flat
        variant="solo"
        placeholder="example: Podcast recording"
      />

      <p class="ma-1">Date:</p>
      <MyDatePicker @change="updateDatesArray" />

      <p class="mt-4 ms-1 mb-1">Location:</p>
      <v-text-field density="compact" flat variant="solo" />

      <v-divider class="my-16" />

      <p class="ma-1">Engineer:</p>
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <v-text-field
            density="compact"
            flat
            variant="solo"
            label="Name"
            class="me-sm-4"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            density="compact"
            flat
            variant="solo"
            type="tel"
            label="Phone number"
            class="ms-sm-4"
          />
        </v-col>
      </v-row>
      <p v-if="helpers.length" class="ma-1">Helpers:</p>
      <v-row
        v-for="(person, idx) of helpers"
        :key="idx"
        no-gutters
        class="mb-6 mb-sm-0"
      >
        <v-col cols="12" sm="6">
          <v-text-field
            density="compact"
            flat
            variant="solo"
            label="Name"
            class="me-sm-4"
          >
            <template #prepend v-if="helpers.length > 1"
              >{{ idx + 1 }}.
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            density="compact"
            flat
            variant="solo"
            type="tel"
            label="Phone number"
            class="ms-sm-4"
          />
        </v-col>
      </v-row>
      <v-btn
        v-if="helpers.length"
        block
        flat
        prepend-icon="mdi-minus"
        append-icon="mdi-account"
        class="mb-4"
        @click="helpers.pop()"
      >
        Remove helper
      </v-btn>
      <v-btn
        block
        flat
        prepend-icon="mdi-plus"
        append-icon="mdi-account"
        @click="helpers.push(1)"
      >
        Add helper
      </v-btn>

      <p class="ma-1 mt-4">Contacts:</p>
      <v-row
        v-for="(person, idx) of contacts"
        :key="idx"
        no-gutters
        class="mb-6 mb-sm-0"
      >
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            density="compact"
            flat
            variant="solo"
            label="Name"
            class="me-sm-4 me-md-2"
          >
            <template #prepend v-if="contacts.length > 1"
              >{{ idx + 1 }}.</template
            >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            density="compact"
            flat
            variant="solo"
            type="tel"
            label="Phone number"
            class="ms-sm-4 ms-md-2 me-md-2"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            density="compact"
            flat
            variant="solo"
            label="Role"
            class="ms-md-2"
          />
        </v-col>
      </v-row>
      <v-btn
        v-if="contacts.length > 1"
        block
        flat
        prepend-icon="mdi-minus"
        append-icon="mdi-account"
        class="mb-4"
        @click="contacts.pop()"
      >
        Remove contact
      </v-btn>
      <v-btn
        block
        flat
        prepend-icon="mdi-plus"
        append-icon="mdi-account"
        @click="contacts.push(1)"
      >
        Add contact
      </v-btn>

      <v-divider class="my-16" />

      <p class="ma-1">Gear:</p>
      <v-btn block flat prepend-icon="mdi-plus">
        Add gear from my inventory
      </v-btn>
      <p class="ma-1">Extra gear and expenses:</p>

      <v-divider class="my-16" />

      <p class="ma-1">Notes:</p>
      <v-textarea v-model="notes" flat variant="solo"></v-textarea>

      <v-divider class="my-4" />

      <v-btn color="success" append-icon="mdi-check" variant="outlined" flat
        >Submit</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
import MyDatePicker from "@/components/MyDatePicker.vue";

export default {
  components: { MyDatePicker },
  data() {
    return {
      title: null,
      datesArray: null,
      helpers: [],
      contacts: [{}],
      notes: "",
    };
  },
  methods: {
    updateDatesArray(newValue) {
      this.datesArray = newValue;
    },
  },
};
</script>
