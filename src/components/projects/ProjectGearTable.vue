<template>
  <v-container
    v-if="project.gearList.length || project.extras.length"
    class="py-4 ps-0 pe-0"
  >
    <v-row v-for="item of project.gearList" :key="item.id">
      <v-col cols="12" md="6" class="pb-2">
        <span style="font-weight: 500">
          {{ item.model }}
        </span>
      </v-col>
      <v-col
        cols="4"
        md="2"
        class="pt-0 pt-md-2"
        :class="{ 'text-right': !isSmAndDown }"
      >
        {{ item.priceday }} ₽
      </v-col>
      <v-col
        cols="4"
        md="2"
        class="pt-0 pt-md-2"
        :class="{
          'text-right': !isSmAndDown,
          'text-center': isSmAndDown,
        }"
      >
        {{ item.qty }} pcs.
      </v-col>
      <v-col cols="4" md="2" class="text-right pt-0 pt-md-2">
        = {{ countTotal(item.priceday, item.qty) }} ₽
      </v-col>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>
    <v-row v-for="item of project.extras" :key="item.id">
      <v-col cols="12" md="6" class="pb-2">
        <span style="font-weight: 500">{{ item.name }}</span>
      </v-col>
      <v-col
        cols="4"
        md="2"
        class="pt-0 pt-md-2"
        :class="{ 'text-right': !isSmAndDown }"
      >
        {{ item.price ? item.price + " ₽" : "-" }}
      </v-col>
      <v-col
        cols="4"
        md="2"
        class="pt-0 pt-md-2"
        :class="{
          'text-right': !isSmAndDown,
          'text-center': isSmAndDown,
        }"
      >
        {{ item.qty ? "* " + item.qty : "-" }}
      </v-col>
      <v-col cols="4" md="2" class="text-right pt-0 pt-md-2">
        {{ item.price ? "= " + countTotal(item.price, item.qty) + " ₽" : "-" }}
      </v-col>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>
    <v-row v-if="allItemsTotal > 0">
      <v-col cols="6">
        <p>Total:</p>
      </v-col>
      <v-col cols="6">
        <p class="text-right">{{ allItemsTotal }} ₽</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["project"],
  computed: {
    allItemsTotal() {
      return (
        this.project.gearList.reduce(
          (acc, item) => item.priceday * item.qty + acc,
          0
        ) +
        this.project.extras.reduce(
          (acc, item) => (item.price || 0) * (item.qty || 1) + acc,
          0
        )
      );
    },
    isSmAndDown() {
      return this.$vuetify.display.smAndDown;
    },
  },
  methods: {
    countTotal(price, qty = 1) {
      return price * qty;
    },
  },
};
</script>
