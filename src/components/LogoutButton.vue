<template>
  <v-btn
    flat
    prepend-icon="mdi-logout"
    :loading="isLoading"
    @click="handleLogOut"
    >{{ $t("settings.logoutaction") }}</v-btn
  >
</template>

<script setup>
import { ref } from "vue";
import { logOut } from "@/services/auth";
import router from "@/plugins/router";

const isLoading = ref(false);

async function handleLogOut() {
  isLoading.value = true;
  await logOut();
  router.push("/login");
}
</script>
