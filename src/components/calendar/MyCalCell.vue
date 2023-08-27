<template>
  <li
    :class="{
      'my-today': isToday,
    }"
  >
    <div class="d-flex justify-end align-start">
      <div class="px-1 pt-1">
        {{ dayNum }}
      </div>
    </div>

    <div class="py-1 d-flex flex-column">
      <v-chip
        v-for="event of props.events"
        :key="event.id"
        size="x-small"
        label
        color="primary"
        class="my-chip ps-1 mx-1 mb-1"
      >
        <span>{{ event.title }}</span>
      </v-chip>
    </div>
  </li>
</template>

<script setup>
const props = defineProps(["dayNum", "isToday", "events"]);
</script>

<style scoped>
li {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  height: 5rem;
  background-color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (min-width: 600px) {
  li {
    min-height: 7rem;
  }
}
.my-today {
  background-color: hsl(0, 100%, 96%);
}
.my-chip {
  font-size: 0.525rem;
}
@media (min-width: 600px) {
  .my-chip {
    font-size: 0.6rem;
  }
}
</style>
