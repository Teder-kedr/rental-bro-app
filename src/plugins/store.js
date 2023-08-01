import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    isAuthStateReady: false,
    error: null,
    errorCount: 0,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
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
      context.commit("setError", payload);
      context.commit("incrementErrorCount");
    },
  },
});

export default store;
