<template>
  <v-dialog theme="dark" persistent :model-value="modelValue">
    <v-card
      theme="light"
      color="background"
      class="mx-auto"
      elevation="10"
      min-width="320px"
      width="80%"
      max-width="750px"
    >
      <v-card-title class="pb-0">Gear</v-card-title>
      <v-card-subtitle class="pb-2" style="border-bottom: 1px solid #ddd">
        Picked items: {{ pickedItemsCount }}
      </v-card-subtitle>

      <v-list v-if="isLoaded">
        <v-container class="pa-0">
          <v-list-item v-for="item of items" :key="item.id" @click.prevent>
            <v-row no-gutters>
              <v-col cols="12" sm="8" class="d-flex flex-column justify-center">
                <v-list-item-title>
                  <span style="font-weight: 500">{{ item.model }}</span> -
                  {{ item.type }}
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
                <v-btn
                  icon="mdi-minus"
                  flat
                  size="small"
                  @click="handleMinus(item)"
                  @dblclick.prevent
                />
                <p style="width: 2.5rem; text-align: center">
                  {{ item.qtyPicked || 0 }}
                </p>
                <v-btn
                  icon="mdi-plus"
                  flat
                  size="small"
                  @click="handlePlus(item)"
                  @dblclick.prevent
                />
              </v-col>
            </v-row>

            <v-divider />
          </v-list-item>
        </v-container>
      </v-list>
      <ContentLoader v-else class="mb-4 py-16" />

      <v-card-actions style="border-top: 1px solid #ddd">
        <v-btn @click="handleCancel">Cancel</v-btn>
        <v-btn class="ms-auto" @click="handleConfirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getGearList } from "@/services/firestore";
import ContentLoader from "./ContentLoader.vue";

export default {
  components: { ContentLoader },
  props: ["gearList", "modelValue"],
  data() {
    return {
      items: [],
      isLoaded: false,
    };
  },
  computed: {
    pickedItemsCount() {
      let count = 0;
      this.items.forEach((item) => {
        if (item.qtyPicked && item.qtyPicked > 0) {
          count++;
        }
      });
      return count;
    },
  },
  watch: {
    async modelValue(newValue) {
      if (newValue === true) {
        this.isLoaded = false;
        this.items = await getGearList();
        this.isLoaded = true;
        this.gearList.forEach((pickedItem) => {
          const theItem = this.items.find((item) => item.id === pickedItem.id);
          theItem.qtyPicked = pickedItem.qty;
        });
      }
    },
  },
  methods: {
    handlePlus(item) {
      if (!item.qtyPicked) {
        item.qtyPicked = 0;
      }
      item.qtyPicked++;
    },
    handleMinus(item) {
      if (!item.qtyPicked || item.qtyPicked === 0) return;
      item.qtyPicked--;
    },
    handleCancel() {
      this.$emit("update:modelValue", false);
      setTimeout(() => {
        this.items.forEach((item) => (item.qtyPicked = 0));
      }, 300);
    },
    handleConfirm() {
      const itemsPicked = [];
      this.items.forEach((item) => {
        if (item.qtyPicked > 0) {
          itemsPicked.push({
            model: item.model,
            type: item.type,
            priceday: item.priceday,
            id: item.id,
            qty: item.qtyPicked,
          });
        }
      });
      this.$emit("change", itemsPicked);
      this.$emit("update:modelValue", false);
    },
  },
};
</script>
