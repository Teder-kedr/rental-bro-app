<template>
  <v-app>
    <spinner-fullscreen :model-value="showSpinner" />
    <error-snackbar />
    <app-sidebar v-if="isUser" />
    <v-main>
      <router-view style="max-width: 1000px" class="pa-4 mx-auto" />
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
import ErrorSnackbar from "./components/ErrorSnackbar.vue";

import { initAuthState } from "./services/auth";

export default {
  components: { AppSidebar, SpinnerFullscreen, ErrorSnackbar },
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
  created() {
    initAuthState();
    if (this.isAuthStateReady === true) {
      this.showSpinner = false;
    }
  },
};
</script>
