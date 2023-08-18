<template>
  <div>
    <p class="my-label">Notes:</p>
    <v-textarea
      :value="notes"
      spellcheck="false"
      flat
      variant="solo"
      style="white-space: pre-line"
      @input="$emit('update:notes', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ["notes"],
};
</script>
