<template>
  <v-container class="py-4 ps-0 pe-4 my-8">
    <v-row v-for="item of project.gearList" :key="item.id">
      <v-col cols="12" md="6" class="pb-0">
        <span style="font-weight: 500">{{ item.model }}</span>
      </v-col>
      <v-col
        cols="4"
        md="2"
        :class="{ 'text-right': $vuetify.display.mdAndUp }"
      >
        {{ item.priceday }} ₽
      </v-col>
      <v-col
        cols="4"
        md="2"
        :class="{
          'text-right': $vuetify.display.mdAndUp,
          'text-center': $vuetify.display.smAndDown,
        }"
      >
        {{ item.qty }} pcs.
      </v-col>
      <v-col cols="4" md="2" class="text-right">
        = {{ item.priceday * item.qty }} ₽
      </v-col>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>
    <v-row v-for="item of project.extras" :key="item.id">
      <v-col cols="12" md="6">
        <span style="font-weight: 500">{{ item.name }}</span>
      </v-col>
      <v-col
        cols="4"
        md="2"
        :class="{ 'text-right': $vuetify.display.mdAndUp }"
      >
        {{ item.price ? item.price + " ₽" : "-" }}
      </v-col>
      <v-col
        cols="4"
        md="2"
        :class="{
          'text-right': $vuetify.display.mdAndUp,
          'text-center': $vuetify.display.smAndDown,
        }"
      >
        {{ item.qty ? "* " + item.qty : "-" }}
      </v-col>
      <v-col cols="4" md="2" class="text-right">
        {{ item.price ? "= " + item.price * (item.qty || 1) + " ₽" : "-" }}
      </v-col>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
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
  },
};
</script>
