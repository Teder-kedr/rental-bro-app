<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        variant="flat"
        v-bind="props"
        prepend-icon="mdi-web"
        append-icon="mdi-menu-down"
      >
        {{ currentLangTitle }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="lang in LANGS"
        :key="lang.locale"
        :value="lang.locale"
        @click="changeLang(lang.locale)"
      >
        <v-list-item-title>{{ lang.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import vuetify from "@/plugins/vuetify";
import { computed } from "vue";

const LANGS = [
  { locale: "en", title: "English" },
  { locale: "ru", title: "Русский" },
];

const currentLangTitle = computed(() => {
  const currentLang = LANGS.find(
    (lang) => lang.locale === vuetify.locale.current.value,
  );
  return currentLang.title;
});

function changeLang(newLocale) {
  localStorage.setItem("preferredLocale", newLocale);
  vuetify.locale.current.value = newLocale;
}
</script>
