import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export async function getGearList() {
  const result = [];
  const querySnapshot = await getDocs(collection(db, "gear"));
  querySnapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      model: doc.data().model,
      type: doc.data().type,
      priceday: doc.data().pricedayrub,
      qty: doc.data().qty,
    });
  });
  return result;
}
