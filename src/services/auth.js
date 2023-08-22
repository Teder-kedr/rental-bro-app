import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";
import store from "@/plugins/store";
import { getReadableError } from "./firebaseReadableErrors";
import { getUserSettings, createUserSettings } from "./firestore";

const auth = getAuth(app);

export async function initAuthState() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const settings = await getUserSettings(user.uid);
      store.commit("setUserSettings", settings);
    }
    store.commit("setUser", user);
    store.commit("setAuthState", true);
  });
}

export async function signUp(name, email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res) {
      await createUserSettings(res.user.uid, {
        fullName: name,
        email,
      });
      const settings = await getUserSettings(res.user.uid);
      store.commit("setUserSettings", settings);
      store.commit("setUser", res.user);
    }
  } catch (error) {
    throw new Error(getReadableError(error.message));
  }
}

export async function logIn(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res) {
      const settings = await getUserSettings(res.user.uid);
      store.commit("setUserSettings", settings);
      store.commit("setUser", res.user);
    }
  } catch (error) {
    throw new Error(getReadableError(error.message));
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    store.commit("setUser", null);
    store.commit("setUserSettings", null);
  } catch (error) {
    throw new Error(getReadableError(error.message));
  }
}
