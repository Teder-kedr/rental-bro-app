import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    isAuthStateReady: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuthState(state, payload) {
      state.isAuthStateReady = payload;
    },
  },
});

export default store;
