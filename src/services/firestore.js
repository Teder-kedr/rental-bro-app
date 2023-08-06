import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export async function getGearList() {
  const result = [];
  const querySnapshot = await getDocs(collection(db, "gear"));
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });
  return result;
}

export async function editGearItem(id, data) {
  await updateDoc(doc(db, "gear", id), data);
}

export async function deleteGearItem(id) {
  await deleteDoc(doc(db, "gear", id));
}

export async function addGearItems(items) {
  await items.forEach((item) => {
    setDoc(doc(db, "gear"), item);
  });
}
