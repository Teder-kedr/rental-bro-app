<template>
  <v-btn
    flat
    prepend-icon="mdi-logout"
    :loading="isLoading"
    @click="handleLogOut"
    >{{ $t("settings.logoutaction") }}</v-btn
  >
</template>
<script>
import { logOut } from "@/services/auth";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async handleLogOut() {
      this.isLoading = true;
      await logOut();
      this.$router.push("/login");
    },
  },
};
</script>
