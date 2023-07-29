import App from "./App.vue";

import { createApp } from "vue";
import router from "./router";
import vuetify from "./vuetify";
import store from "./store";

const app = createApp(App);

app.use(router).use(store).use(vuetify);

app.mount("#app");
