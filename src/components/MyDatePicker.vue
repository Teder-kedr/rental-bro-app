<template>
  <div class="d-flex flex-wrap align-center">
    <VDatePicker
      v-if="calMode === 'multiple'"
      v-model.range="range"
      :expanded="isScreenSmall"
      :locale="$vuetify.locale.current"
      borderless
      color="gray"
    />
    <VDatePicker
      v-else
      v-model="date"
      :expanded="isScreenSmall"
      :locale="$vuetify.locale.current"
      borderless
      color="gray"
    />

    <v-radio-group v-model="calMode" class="mx-4 mt-4">
      <v-radio label="One day" value="single"></v-radio>
      <v-radio label="Multiple days" value="multiple"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  emits: ["change"],
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
  computed: {
    dateStringArray() {
      if (this.calMode === "single") {
        return [format(this.date, "yyyy-MM-dd")];
      }
      return this.getDaysBetweenDates(this.range.start, this.range.end);
    },
    isScreenSmall() {
      return !this.$vuetify.display.smAndUp;
    },
  },
  watch: {
    dateStringArray() {
      this.$emit("change", this.dateStringArray);
    },
    calMode(newValue) {
      if (newValue === "multiple") {
        this.range.start = this.date;
        this.range.end = this.date;
      } else {
        this.date = this.range.start;
      }
    },
  },
  methods: {
    getDaysBetweenDates(startDate, endDate) {
      const daysArray = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        daysArray.push(format(new Date(currentDate), "yyyy-MM-dd"));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return daysArray;
    },
  },
  mounted() {
    this.$emit("change", this.dateStringArray);
  },
};
</script>
