<template>
  <v-dialog theme="dark">
    <v-card theme="light" class="mx-auto" elevation="10" max-width="600">
      <v-card-text>
        <p class="py-2">
          Are you sure you want to delete this item from the database?
        </p>
        <p>
          <b>{{ itemToDelete }}</b>
        </p>
      </v-card-text>
      <v-card-actions class="mx-2">
        <v-btn class="me-auto" @click="$emit('close')">Cancel</v-btn>
        <v-btn color="error" @click="$emit('confirm')">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    itemToDelete: String,
  },
};
</script>
