<template>
  <div>
    <h1 class="mb-4">Gear</h1>
    <v-btn class="mb-6" color="primary" prepend-icon="mdi-plus">Add new</v-btn>
    <GearList />
  </div>
</template>

<script>
import GearList from "@/components/GearList.vue";

export default {
  components: {
    GearList,
  },
};
</script>
