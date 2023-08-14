<template>
  <v-container class="pa-0">
    <h1 class="mb-8">New Project</h1>
    <v-form>
      <p class="mb-1">Project title:</p>
      <v-text-field
        flat
        variant="solo"
        placeholder="example: Podcast recording"
      />
      <v-row>
        <v-col cols="6">
          <p class="mb-1">Project date:</p>
          <VDatePicker v-if="calMode === 'multiple'" v-model.range="range" />
          <VDatePicker v-else v-model="date" />
        </v-col>
        <v-col cols="6" class="d-flex align-center">
          <v-radio-group inline v-model="calMode">
            <v-radio label="One day" value="single"></v-radio>
            <v-radio label="Multiple days" value="multiple"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
// import { format } from "date-fns";

export default {
  data() {
    return {
      date: new Date(),
      range: {
        start: new Date(),
        end: new Date(),
      },
      calMode: "single",
    };
  },
  watch: {
    date() {
      this.range.start = this.date;
      this.range.end = this.date;
    },
  },
};
</script>
