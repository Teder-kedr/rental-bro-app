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
        Picked items: {{ pickedItemsCount }}, total: {{ pickedItemsTotal
        }}{{ currency }}
      </v-card-subtitle>
      <v-btn
        flat
        size="small"
        variant="text"
        color="error"
        @click="handleClearAll"
      >
        Remove all
      </v-btn>

      <v-list v-if="isLoaded">
        <v-container class="pa-0">
          <v-row no-gutters>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="searchFilter"
                class="mx-2 mt-2 mt-sm-0"
                :disabled="!inventoryItems.length"
                density="compact"
                spellcheck="false"
                label="Search"
                clearable
                hide-details
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="typeFilter"
                class="mx-2 mt-4 mt-sm-0"
                :disabled="!inventoryItems.length"
                variant="outlined"
                density="compact"
                label="Filter by type"
                clearable
                :items="presentTypes"
                ref="myTypeFilterEl"
                @click:clear="$refs.myTypeFilterEl.blur()"
              />
            </v-col>
          </v-row>

          <v-list-item
            v-for="item of sortedFilteredItems"
            :key="item.id"
            @click.prevent
            :class="{
              'my-gradient': item.qtyPicked && item.qtyPicked > 0,
            }"
          >
            <v-row no-gutters>
              <v-col cols="12" sm="8" class="d-flex flex-column justify-center">
                <v-list-item-title>
                  <span style="font-weight: 500">{{ item.model }}</span> -
                  {{ item.type }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.priceday }} {{ currency }}/day - Available:
                  {{ item.qty }}
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
        <v-btn class="ms-auto" @click="handleConfirm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getGearList } from "@/services/firestore";
import ContentLoader from "./ContentLoader.vue";

export default {
  components: { ContentLoader },
  props: ["projectGearList", "modelValue"],
  data() {
    return {
      inventoryItems: [],
      isLoaded: false,
      searchFilter: "",
      typeFilter: null,
    };
  },
  computed: {
    pickedItemsCount() {
      let count = 0;
      this.inventoryItems.forEach((item) => {
        if (item.qtyPicked && item.qtyPicked > 0) {
          count++;
        }
      });
      return count;
    },

    pickedItemsTotal() {
      let total = 0;
      this.inventoryItems.forEach((item) => {
        if (item.qtyPicked && item.qtyPicked > 0) {
          total += item.qtyPicked * item.priceday;
        }
      });
      return total;
    },

    presentTypes() {
      const result = [];
      this.inventoryItems.forEach((item) => {
        if (!result.includes(item.type)) {
          result.push(item.type);
        }
      });
      return result;
    },

    filteredItems() {
      if (!this.searchFilter && !this.typeFilter) return this.inventoryItems;
      if (!this.searchFilter) {
        return this.inventoryItems.filter((item) => {
          return this.typeFilter === item.type;
        });
      }
      if (!this.typeFilter) {
        return this.inventoryItems.filter((item) => {
          return item.model
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase());
        });
      }
      return this.inventoryItems.filter((item) => {
        return (
          this.typeFilter === item.type &&
          item.model.toLowerCase().includes(this.searchFilter.toLowerCase())
        );
      });
    },

    sortedFilteredItems() {
      const array = [...this.filteredItems];
      return array.sort((a, b) => {
        if (a.model > b.model) return 1;
        return -1;
      });
    },

    currency() {
      return this.$store.state.userSettings.currency;
    },
  },
  watch: {
    async modelValue() {
      await this.refresh();
    },
  },
  methods: {
    async refresh() {
      this.searchFilter = "";
      this.typeFilter = null;
      this.isLoaded = false;
      try {
        this.inventoryItems = await getGearList();
        this.isLoaded = true;
        this.projectGearList.forEach((pickedItem) => {
          const theItem = this.inventoryItems.find(
            (item) => item.id === pickedItem.id
          );
          if (theItem) {
            theItem.qtyPicked = pickedItem.qty;
          }
        });
      } catch (error) {
        this.$store.dispatch("handleNewError", error.message);
      }
    },
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
    handleClearAll() {
      this.inventoryItems.forEach((item) => (item.qtyPicked = 0));
      this.typeFilter = null;
      this.searchFilter = "";
    },
    handleCancel() {
      this.$emit("update:modelValue", false);
    },
    handleConfirm() {
      const result = [];
      this.inventoryItems.forEach((item) => {
        if (item.qtyPicked > 0) {
          result.push({
            model: item.model,
            type: item.type,
            priceday: item.priceday,
            id: item.id,
            qty: item.qtyPicked,
          });
        }
      });
      this.$emit("update:projectGearList", result);
      this.$emit("update:modelValue", false);
    },
  },
};
</script>

<style scoped>
.my-gradient {
  background: linear-gradient(90deg, hsl(286, 47%, 95%), hsl(192, 51%, 95%));
}
</style>
