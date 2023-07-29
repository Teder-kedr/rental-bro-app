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

const auth = getAuth(app);

export function initAuthState() {
  onAuthStateChanged(auth, (user) => {
    store.commit("setUser", user);
    console.log(user);
    store.commit("setAuthState", true);
  });
}

export async function signUp(name, email, password) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  if (res) {
    await updateProfile(auth.currentUser, { displayName: name });
    store.commit("setUser", res.user);
  } else {
    throw new Error("sign up function failed!");
  }
}

export async function logIn(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  if (res) {
    store.commit("setUser", res.user);
  } else {
    throw new Error("log in function failed!");
  }
}

export async function logOut() {
  await signOut(auth);
  store.commit("setUser", null);
}
