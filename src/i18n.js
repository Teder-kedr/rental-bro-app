import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "ru", // set locale
  fallbackLocale: "en", // set fallback locale,
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
