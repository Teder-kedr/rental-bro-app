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
    if (error.message === "Firebase: Error (auth/invalid-email).") {
      throw new Error("Invalid email");
    }
    if (error.message === "Firebase: Error (auth/email-already-exists).") {
      throw new Error("This email already exists");
    }
    if (error.message === "Firebase: Error (auth/invalid-display-name).") {
      throw new Error("Invalid name");
    }
    if (
      error.message ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      throw new Error("Password should be at least 6 characters");
    }
    throw new Error(error.message);
  }
}

export async function logIn(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res) {
      store.commit("setUser", res.user);
    }
  } catch (error) {
    if (error.message === "Firebase: Error (auth/invalid-email).") {
      throw new Error("Invalid email");
    }
    if (error.message === "Firebase: Error (auth/user-not-found).") {
      throw new Error("Invalid email or password");
    }
    if (error.message === "Firebase: Error (auth/wrong-password).") {
      throw new Error("Invalid email or password");
    }
    throw new Error(error.message);
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    store.commit("setUser", null);
  } catch (error) {
    throw new Error(error.message);
  }
}
