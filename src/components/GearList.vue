<template>
  <v-card>
    <v-container>
      <v-list v-if="items.length">
        <v-list-item nav v-for="item in items" :key="item.id" :value="item.id">
          <v-row no-gutters>
            <v-col cols="12" sm="8">
              <v-icon :size="iconSize" class="mb-1">
                mdi-microphone-variant
              </v-icon>
              <span class="item-model ml-1">
                {{ item.model }}
              </span>
              <span class="item-type ml-2 text-grey-darken-1">
                {{ item.type }}
              </span>
            </v-col>
            <v-col cols="4" sm="2"> {{ item.priceday }} ₽ </v-col>
            <v-col cols="4" sm="2">{{ item.qty }} шт. </v-col>
            <v-divider class="mb-1"></v-divider>
          </v-row>
        </v-list-item>
      </v-list>
      <p v-else class="text-center text-grey-darken-1">No items</p>
    </v-container>
  </v-card>
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
export default {
  data() {
    return {
      items: [
        {
          model: "Sennheiser MKE-416",
          type: "Shotgun mic",
          priceday: 1600,
          qty: 3,
          id: 1,
        },
        {
          model: "Sennheiser MKE-2",
          type: "Lav mic",
          priceday: 800,
          qty: 32,
          id: 2,
        },
        {
          model: "Sennheiser MKE-416",
          type: "Shotgun mic",
          priceday: 1600,
          qty: 3,
          id: 3,
        },
        {
          model: "Sennheiser MKE-2",
          type: "Lav mic",
          priceday: 800,
          qty: 32,
          id: 4,
        },
        {
          model: "Sennheiser MKE-416",
          type: "Shotgun mic",
          priceday: 1600,
          qty: 3,
          id: 5,
        },
        {
          model: "Sennheiser MKE-2",
          type: "Lav mic",
          priceday: 800,
          qty: 32,
          id: 6,
        },
      ],
    };
  },
  computed: {
    iconSize() {
      if (this.$vuetify.display.mobile) return "small";
      return "large";
    },
  },
};
</script>
