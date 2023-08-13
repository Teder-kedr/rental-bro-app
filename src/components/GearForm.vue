<template>
  <v-card-text>
    <v-row no-gutters>
      <v-col>
        <p class="mb-1">Model:</p>
        <v-text-field
          :value="model"
          spellcheck="false"
          placeholder="example: Sennheiser MKE-2"
          density="compact"
          variant="outlined"
          :validation-value="model"
          :rules="[$options.gearFormRules.hasValue]"
          validate-on="input"
          @input="$emit('update:model', $event.target.value)"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <p class="mb-1">Type:</p>
        <v-text-field
          :value="type"
          hide-details
          placeholder="example: lavalier mic"
          density="compact"
          variant="outlined"
          :validation-value="type"
          :rules="[$options.gearFormRules.hasValue]"
          validate-on="input"
          @input="$emit('update:type', $event.target.value)"
        />
        <div class="mt-2 mb-4 d-flex flex-wrap">
          <v-chip
            v-for="opt of typeSuggestions"
            :key="opt"
            size="small"
            class="ma-1"
            @click="$emit('update:type', opt)"
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
          :value="priceday"
          class="hide-spinners me-sm-2"
          type="number"
          density="compact"
          variant="outlined"
          :validation-value="priceday"
          :rules="[$options.gearFormRules.price]"
          validate-on="input"
          @input="$emit('update:priceday', parseInt($event.target.value))"
          @keydown.up.prevent
          @keydown.down.prevent
        />
      </v-col>
      <v-col cols="12" sm="6">
        <p class="mb-1">Quantity:</p>
        <v-text-field
          :value="qty"
          class="hide-spinners ms-sm-2"
          type="number"
          hide-details
          density="compact"
          variant="outlined"
          :validation-value="qty"
          :rules="[$options.gearFormRules.qty]"
          @input="$emit('update:qty', parseInt($event.target.value))"
          @keydown.up.prevent
          @keydown.down.prevent
        >
          <template #prepend>
            <v-btn
              density="compact"
              variant="text"
              icon="mdi-minus"
              @click="decrementQty"
              @dblclick.prevent
            />
          </template>
          <template #append>
            <v-btn
              density="compact"
              variant="text"
              icon="mdi-plus"
              @click="incrementQty"
              @dblclick.prevent
            />
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import gearFormRules from "@/services/gearFormRules";

export default {
  gearFormRules,
  props: {
    model: String,
    type: String,
    priceday: Number,
    qty: Number,
    types: Array,
  },
  emits: ["update:model", "update:type", "update:priceday", "update:qty"],
  computed: {
    typeSuggestions() {
      return this.types.slice(0, 8);
    },
  },
  methods: {
    decrementQty() {
      if (this.qty <= 1) return;
      this.$emit("update:qty", this.qty - 1);
    },
    incrementQty() {
      this.$emit("update:qty", this.qty + 1);
    },
  },
};
</script>

<style scoped>
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
