<template>
  <div>
    <p class="my-label">Engineer:</p>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="myEngineer.name"
          density="compact"
          flat
          variant="solo"
          label="Name"
          class="me-sm-4"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="myEngineer.tel"
          density="compact"
          flat
          variant="solo"
          type="tel"
          label="Phone number"
          class="ms-sm-4"
        />
      </v-col>
    </v-row>
    <p v-if="myHelpers.length" class="my-label">Helpers:</p>
    <v-row v-for="(person, idx) of myHelpers" :key="idx" no-gutters>
      <v-col cols="12">
        <p class="small-count" v-if="myHelpers.length > 1">{{ idx + 1 }}.</p>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="person.name"
          density="compact"
          flat
          variant="solo"
          label="Name"
          class="me-sm-4"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="person.tel"
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
      v-if="myHelpers.length"
      block
      flat
      prepend-icon="mdi-minus"
      append-icon="mdi-account"
      class="mb-4"
      @click="myHelpers.pop()"
    >
      Remove helper
    </v-btn>
    <v-btn
      block
      flat
      prepend-icon="mdi-plus"
      append-icon="mdi-account"
      @click="myHelpers.push({})"
    >
      Add helper
    </v-btn>

    <p class="my-label mt-4">Contacts:</p>
    <v-row v-for="(person, idx) of myContacts" :key="idx" no-gutters>
      <v-col cols="12">
        <p class="small-count" v-if="myContacts.length > 1">{{ idx + 1 }}.</p>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="person.name"
          density="compact"
          flat
          variant="solo"
          label="Name"
          class="me-sm-4 me-md-2"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="person.tel"
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
          v-model="person.role"
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
      @click="myContacts.pop()"
    >
      Remove contact
    </v-btn>
    <v-btn
      block
      flat
      prepend-icon="mdi-plus"
      append-icon="mdi-account"
      @click="myContacts.push({})"
    >
      Add contact
    </v-btn>
  </div>
</template>

<script>
import deepCopy from "@/services/deepCopy";

export default {
  props: ["engineer", "helpers", "contacts"],
  data() {
    return {
      myEngineer: {},
      myHelpers: [],
      myContacts: [{}],
    };
  },
  watch: {
    myEngineer() {
      this.$emit("update:engineer", this.myEngineer);
    },
    myHelpers() {
      this.$emit("update:helpers", this.myHelpers);
    },
    myContacts() {
      this.$emit("update:contacts", this.myContacts);
    },
  },
  created() {
    this.myEngineer = deepCopy(this.engineer);
    this.myHelpers = deepCopy(this.helpers);
    if (this.contacts.length) {
      this.myContacts = deepCopy(this.contacts);
    }
  },
};
</script>

<style scoped>
.small-count {
  font-size: 0.825rem;
  color: grey;
  padding-block: 0.5rem;
}
</style>
