<template>
  <v-container class="pa-0">
    <v-btn
      class="mb-6"
      flat
      color="primary"
      prepend-icon="mdi-plus"
      @click="isAddingNew = true"
    >
      Add new
    </v-btn>
    <EditGearPopup
      v-model="isEditing"
      :item="itemEditing"
      :types="presentTypes"
      @push-update="update"
    />
    <AddGearPopup
      v-model="isAddingNew"
      :types="presentTypes"
      @push-update="update"
    />
    <v-row no-gutters>
      <v-col class="pr-md-2" cols="12" md="6">
        <v-text-field
          v-model="searchFilter"
          :disabled="!items.length"
          density="compact"
          label="Search"
          clearable
          variant="outlined"
        />
      </v-col>
      <v-col class="pl-md-2" cols="12" md="6">
        <v-select
          v-model="typeFilter"
          :disabled="!items.length"
          variant="outlined"
          density="compact"
          label="Filter by type"
          :items="presentTypes"
          multiple
          clearable
        />
      </v-col>
    </v-row>
    <v-expansion-panels
      v-if="sortedFilteredItems.length"
      v-model="openItems"
      variant="accordion"
    >
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
    <ContentLoader v-else />
  </v-container>
</template>

<script>
import { getGearList } from "@/services/firestore";
import ContentLoader from "@/components/ContentLoader.vue";
import EditGearPopup from "./EditGearPopup.vue";
import AddGearPopup from "./AddGearPopup.vue";

export default {
  components: {
    ContentLoader,
    EditGearPopup,
    AddGearPopup,
  },
  data() {
    return {
      items: [],
      searchFilter: "",
      typeFilter: [],
      isLoaded: false,
      isEditing: false,
      itemEditing: null,
      isAddingNew: false,
      openItems: [],
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
      const array = this.filteredItems;
      return array.sort((a, b) => {
        if (a.model > b.model) return 1;
        return -1;
      });
    },
  },
  async mounted() {
    try {
      this.items = await getGearList();
    } catch (error) {
      this.$store.dispatch("handleNewError", error.message);
    } finally {
      this.isLoaded = true;
    }
  },
  watch: {
    searchFilter() {
      this.openItems = [];
    },
    typeFilter() {
      this.openItems = [];
    },
  },
  methods: {
    async update(action) {
      if (action === "delete" || action === "updateDiffName") {
        this.openItems = undefined;
      }
      this.isLoaded = false;
      try {
        this.items = await getGearList(true);
      } catch (error) {
        this.$store.dispatch("handleNewError", error.message);
      } finally {
        this.isLoaded = true;
      }
    },
    handleEditClick(item) {
      this.itemEditing = item;
      this.isEditing = true;
    },
  },
};
</script>

<style scoped>
.item-model {
  font-weight: 500;
}
.item-type {
  font-size: 0.9rem;
  font-style: italic;
}
</style>
