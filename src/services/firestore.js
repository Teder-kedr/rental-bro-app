import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

let cachedGearList = null;

export async function getGearList(forceUpdate) {
  if (cachedGearList && !forceUpdate) {
    return cachedGearList;
  }
  const result = [];
  const querySnapshot = await getDocs(collection(db, "gear"));
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });
  cachedGearList = result;
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
    addDoc(collection(db, "gear"), item);
  });
}

export async function getProjectsList() {
  const result = [];
  const querySnapshot = await getDocs(collection(db, "projects"));
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });
  return result;
}

export async function createProject(project) {
  await addDoc(collection(db, "projects"), project);
}
