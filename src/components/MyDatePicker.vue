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
      v-else
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
    isScreenSmall() {
      return !this.$vuetify.display.smAndUp;
    },
  },
  watch: {
    calMode(newValue) {
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
      if (this.calMode === "single") {
        this.$emit("change", this.date);
      } else {
        this.$emit("change", this.range);
      }
    },
  },
  mounted() {
    this.emitChange();
  },
};
</script>
