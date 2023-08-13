<template>
  <div>
    <h1 class="mb-8">{{ $t("settings.title") }}</h1>
    <div
      class="d-flex flex-column flex-sm-row justify-space-between align-sm-center"
    >
      <p class="my-2">{{ $t("settings.langopttext") }}:</p>
      <LangSwitcher />
    </div>

    <v-divider class="my-4" color="grey-darken-1" />

    <div
      class="d-flex flex-column flex-sm-row justify-space-between align-sm-center"
    >
      <p class="my-2">{{ $t("settings.logoutopttext") }}:</p>
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
