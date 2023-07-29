<template>
  <v-app>
    <spinner-fullscreen :model-value="showSpinner" />
    <app-sidebar v-if="isUser" />
    <v-main>
      <router-view style="max-width: 900px" class="pa-4 mx-auto" />
    </v-main>
  </v-app>
</template>

<style>
:root {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
}
.gradient-background {
  background: linear-gradient(90deg, hsl(286, 47%, 88%), hsl(192, 51%, 88%));
}
</style>

<script>
import AppSidebar from "./components/AppSidebar.vue";
import SpinnerFullscreen from "./components/SpinnerFullscreen.vue";

export default {
  components: { AppSidebar, SpinnerFullscreen },
  data() {
    return {
      showSpinner: true,
    };
  },
  computed: {
    isUser() {
      return this.$store.state.user ? true : false;
    },
    isAuthStateReady() {
      return this.$store.state.isAuthStateReady;
    },
  },
  watch: {
    isAuthStateReady() {
      if (this.isAuthStateReady === true) {
        this.showSpinner = false;
      }
    },
  },
};
</script>
