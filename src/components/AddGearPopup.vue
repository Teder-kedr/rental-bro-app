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

        <gear-form
          v-model:model="item.model"
          v-model:type="item.type"
          v-model:priceday="item.priceday"
          v-model:qty="item.qty"
          :types="types"
        />

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
</style>

<script>
import GearForm from "./GearForm.vue";

export default {
  props: {
    types: Array,
  },
  components: {
    GearForm,
  },
  data() {
    return {
      item: {
        model: "",
        type: "",
        price: 0,
        qty: 1,
      },
    };
  },
  methods: {
    handleCancel() {
      this.$emit("update:modelValue", false);
      this.resetValues();
    },
    resetValues() {
      this.item = {
        model: "",
        type: "",
        price: 0,
        qty: 1,
      };
    },
  },
  computed: {
    isScreenSmall() {
      return !this.$vuetify.display.smAndUp;
    },
  },
  watch: {
    item() {
      if (this.item.qty <= 0) {
        this.item.qty = 1;
      }
      if (this.item.priceday < 0) {
        this.item.priceday = 0;
      }
    },
  },
};
</script>
