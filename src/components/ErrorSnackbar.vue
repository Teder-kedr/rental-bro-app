<template>
  <v-snackbar color="error" multi-line :timeout="timeout">
    <p><b>An error occured:</b></p>
    <slot></slot>
    <template v-slot:actions>
      <v-btn variant="text" @click="$emit('close')" icon="mdi-close"></v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      timeout: 5000,
    };
  },
  emits: ["close"],
};
</script>
