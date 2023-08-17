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
          <td class="px-0">{{ item.model }}</td>
          <td class="text-right">{{ item.qty }}</td>
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
    <p class="my-label mt-4">Extra gear and expenses:</p>
  </div>
</template>

<script>
import GearPicker from "@/components/GearPicker.vue";

export default {
  components: { GearPicker },
  props: ["gearList"],
  data() {
    return {
      isGearPickerOpen: false,
    };
  },
  methods: {
    handleUpdateGearList(newList) {
      this.$emit("update:gearList", newList);
    },
  },
};
</script>

<style scoped>
.my-table {
  background-color: transparent;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
</style>
