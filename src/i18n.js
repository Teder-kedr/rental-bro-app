import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
});

const languages = ["en", "ru"];
const pages = ["projects", "login"];

languages.forEach((lang) => {
  pages.forEach((page) => {
    import(`./locales/${lang}.${page}.json`).then((translations) => {
      i18n.global.mergeLocaleMessage(lang, { [page]: translations });
    });
  });
});

export default i18n;
