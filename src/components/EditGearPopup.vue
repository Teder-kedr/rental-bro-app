<template>
  <v-dialog fullscreen transition="dialog-bottom-transition" :scrim="false">
    <v-card>
      <v-card-text>
        <p>{{ item.id }}</p>
        <p>{{ item.model }}</p>
        <p>{{ item.type }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="$emit('update:modelValue', false)"
          >Close Dialog</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["item"],
};
</script>
