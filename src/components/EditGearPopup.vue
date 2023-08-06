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
          <v-card-title class="card-title">Edit item</v-card-title>
          <v-card-subtitle>id: {{ item.id }}</v-card-subtitle>

          <gear-form
            v-model:model="changedItem.model"
            v-model:type="changedItem.type"
            v-model:priceday="changedItem.priceday"
            v-model:qty="changedItem.qty"
            :types="types"
          />

          <v-card-actions class="py-2 d-flex flex-wrap">
            <v-btn
              variant="outlined"
              :block="isScreenSmall"
              class="ma-1 me-auto px-3"
              color="error"
              append-icon="mdi-close"
              @click="handleDelete"
              :loading="isAwaitingDelete"
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
              @click="handleSave"
              append-icon="mdi-check"
              :loading="isAwaitingResponse"
            >
              Save changes
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </v-card>

    <confirm-delete-popup
      :itemToDelete="item.model"
      v-model="isConfirmationOpen"
      @close="isConfirmationOpen = false"
      @confirm="handleConfirmDelete"
    />
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
</style>

<script>
import GearForm from "./GearForm.vue";
import ConfirmDeletePopup from "./ConfirmDeletePopup.vue";
import { editGearItem, deleteGearItem } from "@/services/firestore";

export default {
  props: {
    item: Object,
    types: Array,
  },
  emits: ["update:modelValue", "pushUpdate"],
  components: {
    GearForm,
    ConfirmDeletePopup,
  },
  data() {
    return {
      isConfirmationOpen: false,
      changedItem: null,
      isFormValid: false,
      isAwaitingResponse: false,
      isAwaitingDelete: false,
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
    async handleSave() {
      if (!this.isFormValid) return;
      this.isAwaitingResponse = true;
      const { model, type, priceday, qty } = this.changedItem;
      const isNameDifferent = model !== this.item.model;
      await editGearItem(this.changedItem.id, { model, type, priceday, qty });
      this.$emit("update:modelValue", false);
      if (isNameDifferent) {
        this.$emit("pushUpdate", "updateDiffName");
      } else {
        this.$emit("pushUpdate", "update");
      }
      this.isAwaitingResponse = false;
    },
    handleDelete() {
      this.isConfirmationOpen = true;
    },
    async handleConfirmDelete() {
      this.isConfirmationOpen = false;
      this.isAwaitingDelete = true;
      await deleteGearItem(this.changedItem.id);
      this.$emit("update:modelValue", false);
      this.$emit("pushUpdate", "delete");
      this.isAwaitingDelete = false;
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
  },
};
</script>
