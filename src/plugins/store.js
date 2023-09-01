import { createStore } from "vuex";

const store = createStore({
  state: {
    APP_VERSION: "0.9.1",
    user: null,
    userSettings: null,
    isAuthStateReady: false,
    error: null,
    errorCount: 0,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setUserSettings(state, payload) {
      state.userSettings = payload;
    },
    setAuthState(state, payload) {
      state.isAuthStateReady = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    incrementErrorCount(state) {
      state.errorCount++;
    },
  },
  actions: {
    handleNewError(context, payload) {
      console.error(payload);
      context.commit("setError", payload);
      context.commit("incrementErrorCount");
    },
    addUserSettings(context, payload) {
      context.commit("setUserSettings", {
        ...context.state.userSettings,
        ...payload,
      });
    },
  },
});

export default store;
