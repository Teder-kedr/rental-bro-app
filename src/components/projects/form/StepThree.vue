<template>
  <div>
    <p class="my-label">Gear:</p>

    <v-table v-if="gearList.length" density="compact" class="my-table py-sm-2">
      <thead>
        <tr>
          <th class="px-0">Item</th>
          <th class="text-right">Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of gearList" :key="item.id">
          <td
            class="px-0"
            :class="{
              'crossed-out': !checkItemStillExists(item),
              'text-error': !checkItemStillExists(item),
            }"
          >
            {{ item.model }}
          </td>
          <td class="text-right">{{ item.qty }}</td>
        </tr>
        <tr>
          <th class="px-0">Total:</th>
          <th class="text-right">{{ gearTotal }} ₽</th>
        </tr>
      </tbody>
    </v-table>

    <v-btn
      block
      flat
      prepend-icon="mdi-plus"
      class="mt-2"
      @click="isGearPickerOpen = true"
    >
      Add gear from my inventory
    </v-btn>
    <GearPicker
      v-model="isGearPickerOpen"
      :gear-list="gearList"
      @change="handleUpdateGearList"
    />
    <p class="my-label mt-8">Extra gear and expenses:</p>
    <v-row v-for="(item, idx) of myExtras" :key="idx" no-gutters>
      <v-col cols="12">
        <p class="small-count" v-if="myExtras.length > 1">{{ idx + 1 }}.</p>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="item.name"
          label="Name"
          spellcheck="false"
          flat
          variant="solo"
          density="compact"
          class="me-sm-2"
        />
      </v-col>
      <v-col cols="6" sm="3">
        <v-text-field
          v-model="item.price"
          label="Price for one"
          flat
          type="number"
          variant="solo"
          density="compact"
          class="hide-spinners me-2 mx-sm-2"
          @keydown.up.prevent
          @keydown.down.prevent
        />
      </v-col>
      <v-col cols="6" sm="3">
        <v-text-field
          v-model="item.qty"
          label="Quantity"
          flat
          type="number"
          variant="solo"
          density="compact"
          class="hide-spinners ms-2"
          @keydown.up.prevent
          @keydown.down.prevent
        />
      </v-col>
    </v-row>
    <p v-if="extrasTotal !== 0" class="my-total mb-4">
      Total: {{ extrasTotal }} ₽
    </p>
    <v-btn
      v-if="myExtras.length"
      block
      flat
      prepend-icon="mdi-minus"
      class="mb-4"
      @click="myExtras.pop()"
      >Remove item</v-btn
    >
    <v-btn
      block
      flat
      prepend-icon="mdi-plus"
      class="mt-2"
      @click="myExtras.push({})"
      >Add item</v-btn
    >
  </div>
</template>

<script>
import GearPicker from "@/components/GearPicker.vue";
import { getGearList } from "@/services/firestore";

export default {
  components: { GearPicker },
  props: ["gearList", "extras"],
  data() {
    return {
      isGearPickerOpen: false,
      myExtras: [],
      myInventory: [],
    };
  },
  computed: {
    gearTotal() {
      return this.gearList.reduce(
        (acc, item) => item.priceday * item.qty + acc,
        0
      );
    },
    extrasTotal() {
      return this.extras.reduce((acc, item) => {
        if (item.price) {
          return item.price * (item.qty || 1) + acc;
        } else return acc;
      }, 0);
    },
  },
  watch: {
    myExtras: {
      deep: true,
      handler() {
        this.$emit("update:extras", this.myExtras);
      },
    },
  },
  methods: {
    handleUpdateGearList(newList) {
      this.$emit("update:gearList", newList);
    },
    checkItemStillExists(item) {
      return this.myInventory.find((i) => i.id === item.id);
    },
  },
  async created() {
    this.myInventory = await getGearList();
  },
};
</script>

<style scoped>
.my-table {
  background-color: transparent;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
.my-total {
  font-size: 0.9rem;
  font-weight: 500;
}
.small-count {
  font-size: 0.825rem;
  color: grey;
  padding-block: 0.5rem;
}
.crossed-out {
  text-decoration: line-through;
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
