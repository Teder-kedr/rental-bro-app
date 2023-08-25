import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "./firestore";
import store from "@/plugins/store";
import { datesFromServer } from "./formatProjectDate";

export async function getAvailabilityMap(inventory, dateArray, currentProjId) {
  const result = inventory.reduce((acc, item) => {
    acc[item.id] = item.qty;
    return acc;
  }, {});

  const projects = [];
  const processedProjectIds = new Set();

  // get all projects with crossing dates
  await Promise.all(
    dateArray.map(async (dateString) => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users", store.state.user.uid, "projects"),
          where("dateEnd", ">=", dateString)
        )
      );

      querySnapshot.forEach((doc) => {
        const { dateStart, dateEnd } = doc.data();

        if (dateStart > dateString) {
          // project has irrelevant date
          return;
        }
        if (processedProjectIds.has(doc.id)) {
          // project has already been processed
          return;
        }
        if (currentProjId === doc.id) {
          // skip
          return;
        }

        projects.push({
          ...doc.data(),
          ...datesFromServer(dateStart, dateEnd),
          id: doc.id,
        });
        processedProjectIds.add(doc.id);
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

  return result;
}
