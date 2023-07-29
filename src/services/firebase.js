import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCXD-LI_VKvhwoanku2O9-z9esuCGkZqI",
  authDomain: "rental-bro-app.firebaseapp.com",
  projectId: "rental-bro-app",
  storageBucket: "rental-bro-app.appspot.com",
  messagingSenderId: "842471090226",
  appId: "1:842471090226:web:c99aa5166e655a3875b42b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
