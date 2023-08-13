<template>
  <div>
    <h1 class="mb-4">Gear</h1>
    <GearList />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import ContentLoader from "@/components/ContentLoader.vue";

export default {
  components: {
    GearList: defineAsyncComponent({
      loader: () => import("@/components/gear/GearList.vue"),
      loadingComponent: ContentLoader,
    }),
  },
};
</script>
