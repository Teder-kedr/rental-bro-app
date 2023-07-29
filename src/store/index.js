import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/services/firebase";

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
  actions: {
    async signUp(context, { email, password }) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("sign up action failed!");
      }
    },
    async logIn(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("log in action failed!");
      }
    },
    async logOut(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },
  },
});

onAuthStateChanged(auth, (user) => {
  store.commit("setUser", user);
  store.commit("setAuthState", true);
});

export default store;
