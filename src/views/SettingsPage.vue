<template>
  <div>
    <h1 class="mb-8">{{ $t("settings.title") }}</h1>
    <div
      class="d-flex flex-column flex-sm-row justify-space-between align-sm-center"
    >
      <p class="my-2">{{ $t("settings.curopttext") }}:</p>
      <CurrencySwitcher />
    </div>

    <v-divider class="my-4" color="grey-darken-1" />

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

    <v-divider class="my-4" color="grey-darken-1" />

    <div class="py-2 text-grey">
      <p v-if="user">user id: {{ user.uid }}</p>
      <p>app version: {{ $store.state.APP_VERSION }}</p>
      <a
        href="https://github.com/Teder-kedr/rental-bro-app"
        target="_blank"
        rel="noopener"
      >
        view this app on GitHub
        <v-icon icon="mdi-open-in-new" size="x-small" />
      </a>
    </div>
  </div>
</template>

<script>
import LogoutButton from "@/components/LogoutButton.vue";
import LangSwitcher from "@/components/LangSwitcher.vue";
import CurrencySwitcher from "@/components/CurrencySwitcher.vue";

export default {
  components: { LogoutButton, LangSwitcher, CurrencySwitcher },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
a {
  color: inherit;
}
</style>
