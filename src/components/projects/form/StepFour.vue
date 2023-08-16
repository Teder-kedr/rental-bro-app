<template>
  <div>
    <p class="my-label">Notes:</p>
    <v-textarea
      :value="notes"
      flat
      variant="solo"
      @input="$emit('update:notes', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ["notes"],
};
</script>
