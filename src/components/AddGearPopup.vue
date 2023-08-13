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
        <v-form v-model="isFormValid" @submit.prevent>
          <v-card-title class="card-title">Add gear</v-card-title>
          <v-card-subtitle v-if="items.length > 1">
            adding {{ items.length }} items
          </v-card-subtitle>

          <div v-for="item of items" :key="item.id">
            <gear-form
              v-model:model="item.model"
              v-model:type="item.type"
              v-model:priceday="item.priceday"
              v-model:qty="item.qty"
              :types="types"
            />

            <div class="d-flex justify-center">
              <v-btn
                v-if="items.length > 1"
                class="mb-4"
                color="error"
                variant="text"
                prepend-icon="mdi-minus"
                @click="handleSplice(items.indexOf(item))"
              >
                Remove
              </v-btn>
            </div>

            <v-divider class="mb-4" />
          </div>

          <div class="d-flex justify-center">
            <v-btn
              class="mb-4"
              variant="text"
              prepend-icon="mdi-plus"
              :disabled="items.length >= $options.ITEMS_LIMIT"
              @click="handleAddMore"
            >
              Add more
            </v-btn>
          </div>

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
              type="submit"
              append-icon="mdi-check"
              :loading="isAwaitingResponse"
              @click="handleSubmit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import GearForm from "./GearForm.vue";
import { addGearItems } from "@/services/firestore";
import { formatGearFields } from "@/services/gearFormRules";

export default {
  ITEMS_LIMIT: 8,
  DEFAULT_ITEM: {
    model: "",
    type: "",
    priceday: 0,
    qty: 0,
  },
  components: {
    GearForm,
  },

  props: {
    types: Array,
  },
  emits: ["update:modelValue", "pushUpdate"],
  data() {
    return {
      items: [{ ...this.$options.DEFAULT_ITEM }],
      isFormValid: false,
      isAwaitingResponse: false,
    };
  },
  computed: {
    isScreenSmall() {
      return !this.$vuetify.display.smAndUp;
    },
  },
  methods: {
    handleCancel() {
      this.$emit("update:modelValue", false);
      this.resetInputs();
    },
    async handleSubmit() {
      if (!this.isFormValid) return;
      try {
        this.isAwaitingResponse = true;
        await addGearItems(formatGearFields(this.items));
        this.$emit("update:modelValue", false);
        this.$emit("pushUpdate", "update");
        setTimeout(() => {
          this.resetInputs();
        }, 300);
      } catch (error) {
        this.$store.dispatch("handleNewError", error.message);
      } finally {
        this.isAwaitingResponse = false;
      }
    },
    handleAddMore() {
      this.items.push({ ...this.$options.DEFAULT_ITEM });
    },
    handleSplice(index) {
      this.items.splice(index, 1);
    },
    resetInputs() {
      this.items = [{ ...this.$options.DEFAULT_ITEM }];
    },
  },
};
</script>

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
