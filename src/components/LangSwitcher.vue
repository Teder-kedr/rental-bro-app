<template>
  <div class="d-flex justify-center">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
          prepend-icon="mdi-web"
          append-icon="mdi-menu-down"
        >
          {{ currentLangTitle }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="lang in langs"
          :key="lang.locale"
          :value="lang.locale"
          @click="changeLang(lang.locale)"
        >
          <v-list-item-title>{{ lang.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: [
        { locale: "en", title: "English" },
        { locale: "ru", title: "Русский" },
      ],
    };
  },
  computed: {
    currentLocale() {
      return this.$vuetify.locale.current;
    },
    currentLangTitle() {
      const langObject = this.langs.find(
        (lang) => lang.locale === this.currentLocale
      );
      return langObject.title;
    },
  },
  methods: {
    changeLang(locale) {
      localStorage.setItem("preferredLocale", locale);
      this.$vuetify.locale.current = locale;
    },
  },
};
</script>
