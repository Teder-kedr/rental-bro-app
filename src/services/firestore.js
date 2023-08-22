import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { app } from "./firebase";
import deepCopy from "./deepCopy";
import { datesToServer, datesFromServer } from "./formatProjectDate";
import { format } from "date-fns";

const db = getFirestore(app);

let cachedGearList = null;

export async function getGearList(forceUpdate) {
  if (cachedGearList && !forceUpdate) {
    return deepCopy(cachedGearList);
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

const queries = {
  upcoming: query(
    collection(db, "projects"),
    where("dateEnd", ">=", format(new Date(), "yyyy-MM-dd")),
    orderBy("dateEnd")
    // orderBy("dateStart")
  ),
  archived: query(
    collection(db, "projects"),
    where("dateStart", "<", format(new Date(), "yyyy-MM-dd")),
    orderBy("dateStart", "desc")
  ),
};

export async function getProjectsList(archiveFilter) {
  const result = [];
  const querySnapshot = await getDocs(queries[archiveFilter]);
  querySnapshot.forEach((doc) => {
    const { dateStart, dateEnd } = doc.data();
    result.push({
      ...doc.data(),
      ...datesFromServer(dateStart, dateEnd),
      id: doc.id,
    });
  });

  return result;
}

export async function createProject(project) {
  const { dates } = project;
  await addDoc(collection(db, "projects"), {
    ...project,
    ...datesToServer(dates),
  });
}

export async function getSingleProject(id) {
  const snapshot = await getDoc(doc(db, "projects", id));
  const { dateStart, dateEnd } = snapshot.data();
  return { ...snapshot.data(), ...datesFromServer(dateStart, dateEnd) };
}

export async function editProject(id, data) {
  const { dates } = data;
  await updateDoc(doc(db, "projects", id), {
    ...data,
    ...datesToServer(dates),
  });
}

export async function deleteProject(id) {
  await deleteDoc(doc(db, "projects", id));
}
