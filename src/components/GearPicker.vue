<template>
  <v-dialog theme="dark">
    <v-card
      theme="light"
      color="background"
      class="mx-auto"
      elevation="10"
      min-width="70%"
    >
      <v-card-title class="pb-0">Gear</v-card-title>
      <v-card-subtitle class="pb-2" style="border-bottom: 1px solid #ddd"
        >Picked 0 items</v-card-subtitle
      >

      <v-list>
        <v-container class="pa-0">
          <v-list-item v-for="(item, idx) of items" :key="item.id">
            <v-row no-gutters>
              <v-col cols="12" sm="8" class="d-flex flex-column justify-center">
                <v-list-item-title>
                  {{ item.model }} - {{ item.type }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.priceday }} ₽/day - Available: {{ item.qty }}
                </v-list-item-subtitle>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="my-2 d-flex justify-end align-center"
              >
                <v-btn icon="mdi-minus" flat size="small"></v-btn>
                <p style="width: 2.5rem; text-align: center">{{ idx }}</p>
                <v-btn icon="mdi-plus" flat size="small"></v-btn>
              </v-col>
            </v-row>

            <v-divider />
          </v-list-item>
        </v-container>
      </v-list>

      <v-card-actions style="border-top: 1px solid #ddd">
        <v-btn>Cancel</v-btn>
        <v-btn class="ms-auto">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getGearList } from "@/services/firestore";

export default {
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    this.items = await getGearList();
  },
};
</script>
