<template>
  <v-container class="pa-0">
    <h1 class="mb-8">New Project</h1>
    <v-form>
      <p class="mb-1">Project title:</p>
      <v-text-field
        v-model="title"
        flat
        variant="solo"
        placeholder="example: Podcast recording"
      />
      <v-row>
        <v-col cols="12">
          <p class="mb-1">Project date:</p>
          <MyDatePicker @change="updateDatesArray" />
        </v-col>
      </v-row>
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
    };
  },
  methods: {
    updateDatesArray(newValue) {
      this.datesArray = newValue;
    },
  },
  watch: {
    datesArray() {
      console.log(this.datesArray);
    },
  },
};
</script>
