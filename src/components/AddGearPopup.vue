<template>
  <v-dialog fullscreen transition="dialog-bottom-transition" :scrim="false">
    <v-card class="pa-8 pt-sm-16">
      <div style="max-width: 1000px" class="mx-auto">
        <v-btn
          variant="text"
          position="absolute"
          icon="mdi-close"
          class="my-close-button"
          @click="handleCancel"
        />
        <v-card-title class="card-title">Add gear</v-card-title>
        <v-card-subtitle v-if="items.length > 1">
          adding {{ items.length }} items
        </v-card-subtitle>

        <div v-for="item of items" :key="item">
          <gear-form
            v-model:model="item.model"
            v-model:type="item.type"
            v-model:priceday="item.priceday"
            v-model:qty="item.qty"
            :types="types"
          />
          <v-btn
            v-if="items.length > 1"
            block
            class="mb-4"
            color="error"
            variant="text"
            prepend-icon="mdi-minus"
            @click="handleSplice(items.indexOf(item))"
          >
            Remove
          </v-btn>
          <v-divider class="mb-4"></v-divider>
        </div>

        <v-btn
          block
          class="my-4"
          variant="text"
          prepend-icon="mdi-plus"
          @click="handleAddMore"
          :disabled="items.length >= $options.ITEMS_LIMIT"
        >
          Add more
        </v-btn>

        <v-card-actions class="py-0 d-flex flex-wrap">
          <v-btn
            variant="outlined"
            :block="isScreenSmall"
            class="ma-1 me-auto px-3"
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
            Save
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.my-close-button {
  top: 2rem;
  right: 2rem;
}
.card-title {
  font-size: 2rem;
}
.item-index-text {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>

<script>
import GearForm from "./GearForm.vue";

export default {
  ITEMS_LIMIT: 8,
  DEFAULT_ITEM: {
    model: "",
    type: "",
    price: 0,
    qty: 1,
  },

  props: {
    types: Array,
  },
  components: {
    GearForm,
  },
  data() {
    return {
      items: [{ ...this.$options.DEFAULT_ITEM }],
    };
  },
  methods: {
    handleCancel() {
      this.$emit("update:modelValue", false);
      this.resetValues();
    },
    handleAddMore() {
      this.items.push({ ...this.$options.DEFAULT_ITEM });
    },
    handleSplice(index) {
      this.items.splice(index, 1);
    },
    resetValues() {
      this.items = [{ ...this.$options.DEFAULT_ITEM }];
    },
  },
  computed: {
    isScreenSmall() {
      return !this.$vuetify.display.smAndUp;
    },
  },
};
</script>
