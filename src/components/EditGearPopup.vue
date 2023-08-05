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

export default {
  props: {
    item: Object,
    types: Array,
  },
  components: {
    GearForm,
    ConfirmDeletePopup,
  },
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
    handleConfirmDelete() {
      this.isConfirmationOpen = false;
      // ...
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
