<template>
  <v-app>
    <SpinnerFullscreen :model-value="showSpinner" />
    <ErrorSnackbar />
    <AppSidebar v-if="isUser" />
    <v-main>
      <router-view
        style="max-width: 1000px"
        class="px-4 pb-4 pt-md-4 mx-auto"
      />
    </v-main>
  </v-app>
</template>

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
    if (localStorage.getItem("preferredLocale")) {
      this.$vuetify.locale.current = localStorage.getItem("preferredLocale");
    }

    initAuthState();
    if (this.isAuthStateReady === true) {
      this.showSpinner = false;
    }
  },
};
</script>
