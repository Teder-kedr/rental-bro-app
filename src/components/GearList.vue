<template>
  <v-container class="pa-0">
    <v-expansion-panels variant="accordion" v-if="items.length">
      <v-expansion-panel v-for="item in items" :key="item.id">
        <v-expansion-panel-title>
          <v-row no-gutters>
            <v-col cols="12" sm="8" class="mb-2 d-sm-flex align-center">
              <v-icon :size="iconSize"> mdi-microphone-variant </v-icon>
              <span class="item-model ml-1">
                {{ item.model }}
              </span>
              <span class="item-type ml-2 text-grey-darken-1">
                {{ item.type }}
              </span>
            </v-col>
            <v-col cols="4" sm="2" class="d-sm-flex align-center">
              <span> {{ item.priceday }} ₽ </span>
            </v-col>
            <v-col cols="4" sm="2" class="d-sm-flex align-center">
              <span>{{ item.qty }} шт. </span>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <p>id: {{ item.id }}</p>
          <v-btn
            prepend-icon="mdi-pencil"
            color="primary"
            class="float-right"
            variant="text"
            :to="'/gear/edit/' + item.id"
          >
            Edit
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <p v-else class="text-center text-grey-darken-1">No items</p>
  </v-container>
</template>

<style scoped>
.item-model {
  font-weight: 500;
}
.item-type {
  font-size: 0.9rem;
  font-style: italic;
}
</style>

<script>
import { getGearList } from "@/services/firestore";

export default {
  data() {
    return {
      items: [],
    };
  },
  computed: {
    iconSize() {
      if (this.$vuetify.display.mobile) return "small";
      return "large";
    },
  },
  async mounted() {
    this.items = await getGearList();
  },
};
</script>
