import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "./firebase";
import store from "@/store";
import { getReadableError } from "./firebaseReadableErrors";

const auth = getAuth(app);

export function initAuthState() {
  onAuthStateChanged(auth, (user) => {
    store.commit("setUser", user);
    store.commit("setAuthState", true);
  });
}

export async function signUp(name, email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res) {
      await updateProfile(auth.currentUser, { displayName: name });
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
  } catch (error) {
    throw new Error(getReadableError(error.message));
  }
}
