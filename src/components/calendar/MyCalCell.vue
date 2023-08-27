<template>
  <li
    :class="{
      'my-today': isToday,
    }"
  >
    <div class="d-flex justify-end align-start">
      <div class="pa-1">
        {{ dayNum }}
      </div>
    </div>
    <p class="pa-1"></p>
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
  background-color: white;
}
@media (min-width: 600px) {
  li {
    min-height: 7rem;
  }
}
.my-today {
  background-color: hsl(0, 100%, 95%);
}
</style>
