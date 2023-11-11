<template>
  <v-navigation-drawer v-model="isSidebarOpen" app :touchless="!isScreenSmall">
    <v-list active-class="gradient-background" color="white">
      <v-list-item>
        <p class="sidebar-app-title">RENTAL BRO APP</p>
      </v-list-item>
      <v-list-item to="/projects">
        <v-icon icon="mdi-movie-open-outline" color="black" start />
        <span class="ml-1 text-black">{{ $t("sidebar.projects") }}</span>
      </v-list-item>
      <v-list-item to="/calendar">
        <v-icon icon="mdi-calendar-month-outline" color="black" start />
        <span class="ml-1 text-black">{{ $t("sidebar.calendar") }}</span>
      </v-list-item>
      <v-list-item to="/gear">
        <v-icon
          class="rotated-icon"
          icon="mdi-audio-input-xlr"
          color="black"
          start
        />
        <span class="ml-1 text-black">{{ $t("sidebar.gear") }}</span>
      </v-list-item>
    </v-list>
    <template #append>
      <v-list active-class="gradient-background" color="white">
        <SidebarUserInfo />
        <v-list-item to="/settings">
          <v-icon icon="mdi-cog-outline" color="black" start />
          <span class="ml-1 text-black">{{ $t("sidebar.settings") }}</span>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
  <v-toolbar class="d-block d-md-none" color="transparent" app right>
    <v-btn icon="mdi-menu" @click.stop="isSidebarOpen = !isSidebarOpen" />
  </v-toolbar>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import SidebarUserInfo from "./SidebarUserInfo.vue";

const { mobile } = useDisplay();
const isSidebarOpen = ref(!mobile.value);

const isScreenSmall = computed(() => {
  return useDisplay().smAndDown;
});
</script>

<style scoped>
.sidebar-app-title {
  font-style: italic;
  font-weight: 700;
}
.rotated-icon {
  transform: rotate(90deg);
}
</style>
