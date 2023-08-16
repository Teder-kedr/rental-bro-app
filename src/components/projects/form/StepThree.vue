<template>
  <div>
    <p class="my-label">Gear:</p>
    <v-btn block flat prepend-icon="mdi-plus" @click="isGearPickerOpen = true">
      Add gear from my inventory
    </v-btn>
    <GearPicker v-model="isGearPickerOpen" />
    <p class="my-label mt-4">Extra gear and expenses:</p>
  </div>
</template>

<script>
import GearPicker from "@/components/GearPicker.vue";

export default {
  components: { GearPicker },
  data() {
    return {
      isGearPickerOpen: false,
    };
  },
};
</script>
