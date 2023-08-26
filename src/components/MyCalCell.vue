<template>
  <li
    :class="{
      'my-gradient': isToday,
    }"
  >
    <div class="d-flex justify-end align-start">
      <div class="pa-1">
        {{ dayNum }}
      </div>
    </div>
  </li>
</template>

<script setup>
defineProps({
  dayNum: Number,
  isToday: Boolean,
});
</script>

<style scoped>
li {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  min-height: 5rem;
}
@media (min-width: 600px) {
  li {
    min-height: 7rem;
  }
}
.my-gradient {
  background: linear-gradient(
    90deg,
    hsla(347, 46%, 90%, 0.7),
    hsla(329, 53%, 90%, 0.7)
  );
}
</style>
