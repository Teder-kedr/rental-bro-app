<template>
  <div class="my-1 d-flex flex-wrap justify-sm-center align-center">
    <VDatePicker
      v-if="calMode === 'multiple'"
      v-model.range="range"
      :expanded="isScreenSmall"
      :locale="$vuetify.locale.current"
      borderless
      color="gray"
    />
    <VDatePicker
      v-else-if="calMode === 'single'"
      v-model="date"
      :expanded="isScreenSmall"
      :locale="$vuetify.locale.current"
      borderless
      color="gray"
    />

    <v-radio-group v-model="calMode" class="mx-4 mt-4" style="flex-grow: 0">
      <v-radio
        label="One day"
        inline
        value="single"
        style="width: fit-content"
      />
      <v-radio
        label="Multiple days"
        inline
        value="multiple"
        style="width: fit-content"
      />
    </v-radio-group>
  </div>
</template>

<script>
import { parseISO } from "date-fns";
import { projectDatesIntoArray } from "@/services/formatProjectDate";

export default {
  props: ["providedDates"],
  emits: ["change"],
  data() {
    return {
      date: new Date(),
      range: {},
      calMode: undefined,
    };
  },
  computed: {
    isScreenSmall() {
      return !this.$vuetify.display.smAndUp;
    },
  },
  watch: {
    calMode(newValue, oldValue) {
      if (oldValue === undefined) return;

      if (newValue === "multiple") {
        this.range.start = this.date;
        this.range.end = this.date;
      } else {
        this.date = this.range.start;
      }
    },
    date() {
      this.emitChange();
    },
    range() {
      this.emitChange();
    },
  },
  methods: {
    emitChange() {
      let result;
      if (this.calMode === "single") {
        result = this.date;
      } else {
        result = this.range;
      }
      this.$emit("change", projectDatesIntoArray(result));
    },
  },
  created() {
    if (this.providedDates) {
      if (this.providedDates.length === 1) {
        this.date = parseISO(this.providedDates[0]);
        this.calMode = "single";
      } else {
        this.range.start = parseISO(this.providedDates[0]);
        this.range.end = parseISO(this.providedDates.at(-1));
        this.calMode = "multiple";
      }
    } else {
      this.calMode = "single";
    }
    this.emitChange();
  },
};
</script>
