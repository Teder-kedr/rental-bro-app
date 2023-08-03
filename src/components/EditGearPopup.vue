<template>
  <v-dialog fullscreen transition="dialog-bottom-transition" :scrim="false">
    <v-card class="pa-8">
      <div style="max-width: 1000px" class="mx-auto">
        <v-btn
          variant="text"
          position="absolute"
          icon="mdi-close"
          class="my-close-button"
          @click="handleCancel"
        />
        <v-card-title class="card-title">Edit item</v-card-title>
        <v-card-subtitle>id: {{ item.id }}</v-card-subtitle>
        <v-card-text class="pa-4">
          <v-row no-gutters>
            <v-col>
              <p class="mb-1">Model:</p>
              <v-text-field
                v-model="changedItem.model"
                spellcheck="false"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <p class="mb-1">Type:</p>
              <v-text-field
                v-model="changedItem.type"
                hide-details
                density="compact"
                variant="outlined"
              />
              <div class="mt-1 mb-3 d-flex flex-wrap">
                <v-chip
                  v-for="opt of types"
                  :key="opt"
                  size="small"
                  class="ma-1"
                  @click="changedItem.type = opt"
                >
                  {{ opt }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" sm="6">
              <p class="mb-1">Price per day (₽):</p>
              <v-text-field
                v-model="changedItem.priceday"
                class="hide-spinners me-sm-2"
                type="number"
                @keydown.up.prevent
                @keydown.down.prevent
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <p class="mb-1">Quantity:</p>
              <v-text-field
                v-model="changedItem.qty"
                class="hide-spinners ms-sm-2"
                type="number"
                @keydown.up.prevent
                @keydown.down.prevent
                density="compact"
                variant="outlined"
              >
                <template v-slot:prepend>
                  <v-btn
                    variant="text"
                    icon="mdi-minus"
                    @click="decrementQty"
                    @dblclick.prevent
                  ></v-btn>
                </template>
                <template v-slot:append>
                  <v-btn
                    variant="text"
                    icon="mdi-plus"
                    @click="incrementQty"
                    @dblclick.prevent
                  ></v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="py-0 d-flex flex-wrap">
          <v-btn
            variant="outlined"
            :block="isScreenSmall"
            class="ma-1 me-auto px-3"
            color="error"
            append-icon="mdi-close"
            @click="handleDelete"
          >
            Delete item
          </v-btn>
          <v-btn
            variant="outlined"
            :block="isScreenSmall"
            class="ma-1 px-3"
            @click="handleCancel"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="outlined"
            :block="isScreenSmall"
            class="ma-1 px-3"
            color="success"
            @click="handleCancel"
            append-icon="mdi-check"
          >
            Save changes
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
    <v-dialog theme="dark" v-model="isConfirmationOpen">
      <v-card theme="light" class="mx-auto" elevation="10" max-width="600">
        <v-card-text>
          <p class="py-2">
            Are you sure you want to delete this item from the database?
          </p>
          <p>
            <b>{{ item.model }}</b>
          </p>
        </v-card-text>
        <v-card-actions class="mx-2">
          <v-btn class="me-auto" @click="this.isConfirmationOpen = false">
            Cancel
          </v-btn>
          <v-btn color="error" @click="handleConfirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<style scoped>
.my-close-button {
  right: 2rem;
}
.card-title {
  font-size: 2rem;
}
.hide-spinners ::-webkit-inner-spin-button,
.hide-spinners ::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.hide-spinners ::-moz-inner-spin-button,
.hide-spinners ::-moz-outer-spin-button {
  -moz-appearance: none;
  margin: 0;
}
</style>

<script>
export default {
  props: { item: Object, types: Array },
  data() {
    return {
      isConfirmationOpen: false,
      changedItem: null,
    };
  },
  methods: {
    resetInputs() {
      this.changedItem = { ...this.item };
    },
    handleCancel() {
      this.$emit("update:modelValue", false);
      this.resetInputs();
    },
    handleDelete() {
      this.isConfirmationOpen = true;
    },
    handleConfirmDelete() {},
    decrementQty() {
      if (this.changedItem.qty <= 1) return;
      this.changedItem.qty--;
    },
    incrementQty() {
      this.changedItem.qty++;
    },
  },
  computed: {
    isScreenSmall() {
      return !this.$vuetify.display.smAndUp;
    },
  },
  watch: {
    item() {
      this.resetInputs();
    },
    changedItem() {
      if (this.changedItem.qty <= 0) {
        this.changedItem.qty = 1;
      }
      if (this.changedItem.priceday < 0) {
        this.changedItem.priceday = 0;
      }
    },
  },
};
</script>
