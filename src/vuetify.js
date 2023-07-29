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
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1E183B",
          secondary: "#1867C0",
          background: "#ebebeb",
        },
      },
    },
  },
});
