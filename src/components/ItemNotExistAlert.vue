<template>
  <v-alert type="error" variant="tonal" class="my-alert py-3 mb-3">
    {{ $t("projects.someItemsNotExist") }}
  </v-alert>
</template>

<style scoped>
.my-alert {
  font-size: 0.9rem;
}
</style>
