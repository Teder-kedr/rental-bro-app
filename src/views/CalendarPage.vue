<template>
  <div>
    <h1 class="mb-4">{{ $t("calendar.title") }}</h1>
    <MyCalendar :locale="$vuetify.locale.current" />
  </div>
</template>

<script>
import MyCalendar from "@/components/calendar/MyCalendar.vue";

export default {
  components: { MyCalendar },
};
</script>
