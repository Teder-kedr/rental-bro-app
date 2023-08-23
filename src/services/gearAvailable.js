import { getDocs, collection, where } from "firebase/firestore";
import { db } from "./firestore";
import store from "@/plugins/store";
import { datesFromServer } from "./formatProjectDate";

const memoizationCache = new Map();

export async function getAvailabilityMap(gearList, dateArray, currentProjId) {
  const cacheKey = JSON.stringify({ gearList, dateArray, currentProjId });
  if (memoizationCache.has(cacheKey)) {
    return memoizationCache.get(cacheKey);
  }

  const result = gearList.reduce((acc, item) => {
    acc[item.id] = item.qty;
    return acc;
  }, {});

  const projects = [];
  const processedProjectIds = new Set();

  // get all projects with crossing dates
  await Promise.all(
    dateArray.map(async (dateString) => {
      const querySnapshot = await getDocs(
        collection(db, "users", store.state.user.uid, "projects"),
        where("dateStart", "<=", dateString),
        where("dateEnd", ">=", dateString)
      );

      querySnapshot.forEach((doc) => {
        if (processedProjectIds.has(doc.id)) {
          // do nothing
        } else if (currentProjId === doc.id) {
          // skip
        } else {
          const { dateStart, dateEnd } = doc.data();
          projects.push({
            ...doc.data(),
            ...datesFromServer(dateStart, dateEnd),
            id: doc.id,
          });

          processedProjectIds.add(doc.id);
        }
      });
    })
  );

  // subtract used items from total
  projects.forEach((project) => {
    project.gearList.forEach((item) => {
      if (result[item.id]) {
        result[item.id] -= item.qty;
      }
    });
  });

  memoizationCache.set(cacheKey, result);
  return result;
}
