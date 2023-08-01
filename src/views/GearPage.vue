<template>
  <div>
    <h1 class="mb-4">Gear</h1>
    <v-btn class="mb-6" color="primary" prepend-icon="mdi-plus">Add new</v-btn>
    <GearList />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import ContentLoader from "@/components/ContentLoader.vue";

export default {
  components: {
    GearList: defineAsyncComponent({
      loader: () => import("@/components/GearList.vue"),
      loadingComponent: ContentLoader,
    }),
  },
};
</script>
