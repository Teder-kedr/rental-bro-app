<template>
  <v-table density="compact" class="my-card-table me-lg-2">
    <thead>
      <tr>
        <th class="px-0">Item</th>
        <th class="text-right">Qty</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(qty, item) in project.gearList" :key="item">
        <td class="px-0">{{ item }}</td>
        <td class="text-right">{{ qty }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>
