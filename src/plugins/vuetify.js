/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { useI18n } from "vue-i18n";
import i18n from "./i18n";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  display: {
    mobileBreakpoint: "md",
  },
  defaults: {
    global: {
      ripple: false,
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1E183B",
          secondary: "#1867C0",
          background: "#ebebeb",
          success: "#228c22",
          warning: "#e88800",
        },
      },
    },
  },
});
