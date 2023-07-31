<template>
  <div>
    <h1 class="mb-8">Settings</h1>
    <div
      class="d-flex flex-column flex-sm-row justify-space-between align-sm-center"
    >
      <p class="my-2">Change language:</p>
      <LangSwitcher />
    </div>

    <v-divider class="my-4" color="grey-darken-1"></v-divider>

    <div
      class="d-flex flex-column flex-sm-row justify-space-between align-sm-center"
    >
      <p class="my-2">Log out from your account:</p>
      <LogoutButton />
    </div>
  </div>
</template>

<script>
import LogoutButton from "@/components/LogoutButton.vue";
import LangSwitcher from "@/components/LangSwitcher.vue";

export default {
  components: { LogoutButton, LangSwitcher },
};
</script>
