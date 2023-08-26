<template>
  <div>
    <h1 class="mb-8">Calendar</h1>
    <MyCalendar :locale="$vuetify.locale.current" />
  </div>
</template>

<script>
import MyCalendar from "@/components/MyCalendar.vue";

export default {
  components: { MyCalendar },
};
</script>
