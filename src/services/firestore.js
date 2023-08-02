import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export async function getGearList() {
  const result = [];
  const querySnapshot = await getDocs(collection(db, "gear"));
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    const { model, type, pricedayrub: priceday, qty } = doc.data();
    result.push({ id, model, type, priceday, qty });
  });
  return result;
}
