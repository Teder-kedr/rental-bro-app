<template>
  <div>
    <p class="my-label">
      Project title:
      <span class="text-grey" style="font-weight: 400">
        <em>(required)</em>
      </span>
    </p>
    <v-text-field
      :value="title"
      flat
      variant="solo"
      spellcheck="false"
      placeholder="example: Podcast recording"
      :rules="[isNotEmpty]"
      @input="$emit('update:title', $event.target.value)"
    />

    <p class="my-label">
      Date:
      <span class="text-grey" style="font-weight: 400">
        <em>(required)</em>
      </span>
    </p>
    <MyDatePicker @change="updateDates" />

    <p class="mt-sm-4 my-label">Location:</p>
    <v-text-field
      :value="location"
      density="compact"
      flat
      variant="solo"
      spellcheck="false"
      placeholder="example: Penny Lane, 24/2"
      @input="$emit('update:location', $event.target.value)"
    />
  </div>
</template>

<script>
import MyDatePicker from "@/components/MyDatePicker.vue";

export default {
  components: { MyDatePicker },
  props: ["title", "dates", "location"],
  methods: {
    updateDates(newValue) {
      this.$emit("update:dates", newValue);
    },
    isNotEmpty(val) {
      if (val && val.trim() === "") return false;
      return !!val;
    },
  },
};
</script>
