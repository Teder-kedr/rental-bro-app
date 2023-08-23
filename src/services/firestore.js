import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  setDoc,
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
import store from "@/plugins/store";

export const db = getFirestore(app);

export async function getUserSettings(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));
  return { ...snapshot.data() };
}

export async function updateUserSettings(uid, data) {
  await updateDoc(doc(db, "users", uid), data);
}

export async function createUserSettings(uid, data) {
  await setDoc(doc(db, "users", uid), data);
}

let cachedGearList = null;

export async function getGearList(forceUpdate) {
  if (
    cachedGearList &&
    cachedGearList.uid === store.state.user.uid &&
    !forceUpdate
  ) {
    return deepCopy(cachedGearList.data);
  }
  const result = [];
  const querySnapshot = await getDocs(
    collection(db, "users", store.state.user.uid, "gear")
  );
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });
  cachedGearList = {};
  cachedGearList.uid = store.state.user.uid;
  cachedGearList.data = result;
  return result;
}

export async function editGearItem(id, data) {
  await updateDoc(doc(db, "users", store.state.user.uid, "gear", id), data);
}

export async function deleteGearItem(id) {
  await deleteDoc(doc(db, "users", store.state.user.uid, "gear", id));
}

export async function addGearItems(items) {
  await items.forEach((item) => {
    addDoc(collection(db, "users", store.state.user.uid, "gear"), item);
  });
}

function getQueries() {
  if (store.state.user) {
    return {
      upcoming: query(
        collection(db, "users", store.state.user.uid, "projects"),
        where("dateEnd", ">=", format(new Date(), "yyyy-MM-dd")),
        orderBy("dateEnd")
      ),
      archived: query(
        collection(db, "users", store.state.user.uid, "projects"),
        where("dateStart", "<", format(new Date(), "yyyy-MM-dd")),
        orderBy("dateStart", "desc")
      ),
    };
  }
}

export async function getProjectsList(archiveFilter) {
  const result = [];
  const querySnapshot = await getDocs(getQueries()[archiveFilter]);
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
  await addDoc(collection(db, "users", store.state.user.uid, "projects"), {
    ...project,
    ...datesToServer(dates),
  });
}

export async function getSingleProject(id) {
  const snapshot = await getDoc(
    doc(db, "users", store.state.user.uid, "projects", id)
  );
  const { dateStart, dateEnd } = snapshot.data();
  return {
    ...snapshot.data(),
    ...datesFromServer(dateStart, dateEnd),
    id: snapshot.id,
  };
}

export async function editProject(id, data) {
  const { dates } = data;
  await updateDoc(doc(db, "users", store.state.user.uid, "projects", id), {
    ...data,
    ...datesToServer(dates),
  });
}

export async function deleteProject(id) {
  await deleteDoc(doc(db, "users", store.state.user.uid, "projects", id));
}
