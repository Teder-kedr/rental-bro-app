import { createI18n } from "vue-i18n";
// import messages from "@intlify/unplugin-vue-i18n/messages";

const i18n = createI18n({
  locale: "ru", // set locale
  fallbackLocale: "en", // set fallback locale,
  // messages,
});

const languages = ["en", "ru"];
const pages = ["projects"];

languages.forEach((lang) => {
  pages.forEach((page) => {
    import(`./locales/${page}.${lang}.json`).then((translations) => {
      i18n.global.mergeLocaleMessage(lang, { [page]: translations });
    });
  });
});

export default i18n;
