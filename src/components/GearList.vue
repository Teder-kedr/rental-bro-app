<template>
  <v-container class="pa-0">
    <edit-gear-popup :item="itemEditing" v-model="isDialog" />
    <v-row no-gutters>
      <v-col class="pr-md-2" cols="12" md="6">
        <v-text-field
          :disabled="!items.length"
          density="compact"
          label="Search"
          clearable
          variant="outlined"
          v-model="searchFilter"
        />
      </v-col>
      <v-col class="pl-md-2" cols="12" md="6">
        <v-select
          :disabled="!items.length"
          variant="outlined"
          density="compact"
          label="Filter by type"
          :items="presentTypes"
          multiple
          clearable
          v-model="typeFilter"
        ></v-select>
      </v-col>
    </v-row>
    <v-expansion-panels variant="accordion" v-if="sortedFilteredItems.length">
      <v-expansion-panel v-for="item in sortedFilteredItems" :key="item.id">
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
            @click="handleEditClick(item)"
          >
            Edit
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <p v-else-if="isLoaded" class="text-center text-grey-darken-1">No items</p>
    <content-loader v-else />
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
import ContentLoader from "./ContentLoader.vue";
import EditGearPopup from "./EditGearPopup.vue";

export default {
  components: {
    ContentLoader,
    EditGearPopup,
  },
  data() {
    return {
      items: [],
      searchFilter: "",
      typeFilter: [],
      isLoaded: false,
      isDialog: false,
      itemEditing: null,
    };
  },
  computed: {
    iconSize() {
      if (this.$vuetify.display.mobile) return "small";
      return "large";
    },

    presentTypes() {
      const result = [];
      this.items.forEach((item) => {
        if (!result.includes(item.type)) {
          result.push(item.type);
        }
      });
      return result;
    },

    filteredItems() {
      if (!this.searchFilter && !this.typeFilter.length) return this.items;
      if (!this.searchFilter) {
        return this.items.filter((item) => {
          return this.typeFilter.includes(item.type);
        });
      }
      if (!this.typeFilter.length) {
        return this.items.filter((item) => {
          return item.model
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase());
        });
      }
      return this.items.filter((item) => {
        return (
          this.typeFilter.includes(item.type) &&
          item.model.toLowerCase().includes(this.searchFilter.toLowerCase())
        );
      });
    },

    sortedFilteredItems() {
      return this.filteredItems.toSorted((a, b) => {
        if (a.model > b.model) return 1;
        return -1;
      });
    },
  },
  async mounted() {
    this.items = await getGearList();
    this.isLoaded = true;
  },
  methods: {
    async update() {
      this.isLoaded = false;
      this.items = await getGearList();
      this.isLoaded = true;
    },
    handleEditClick(item) {
      this.itemEditing = item;
      this.isDialog = true;
    },
  },
};
</script>
