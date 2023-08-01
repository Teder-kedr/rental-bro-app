<template>
  <div>
    <h1 class="mb-4">Edit Gear</h1>
    <v-form @submit.prevent>
      <p class="my-2">Model:</p>
      <v-text-field
        clearable
        variant="outlined"
        placeholder="example: Sennheiser MKE-2"
        v-model="item.model"
      />

      <p class="my-2">Type:</p>
      <v-text-field
        clearable
        variant="outlined"
        placeholder="example: Lav mic"
        v-model="item.type"
      />
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        model: "Sennheiser MKE-416",
        type: "Shotgun mic",
        priceday: 1600,
        qty: 3,
        id: 1,
      },
    };
  },
};
</script>
