import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "./firestore";
import store from "@/plugins/store";
import { datesFromServer } from "./formatProjectDate";

export function monthlyProjectsGetter() {
  const projectsPool = [];

  return async (navYear, navMonthStr) => {
    const stringToQuery = `${navYear}-${navMonthStr}-01`;
    const querySnapshot = await getDocs(
      query(
        collection(db, "users", store.state.user.uid, "projects"),
        where("dateEnd", ">=", stringToQuery)
      )
    );

    querySnapshot.forEach((doc) => {
      if (projectsPool.some((proj) => proj.id === doc.id)) return;
      else {
        const { dateStart, dateEnd } = doc.data();
        projectsPool.push({
          ...doc.data(),
          ...datesFromServer(dateStart, dateEnd),
          id: doc.id,
        });
      }
    });

    let nextMonthStr = String(parseInt(navMonthStr) + 1).padStart(2, "0");
    let nextYear;
    if (nextMonthStr === "12") {
      nextMonthStr = "01";
      nextYear = navYear + 1;
    } else {
      nextYear = navYear;
    }

    const lowerFilterBorder = stringToQuery;
    const upperFilterBorder = `${nextYear}-${nextMonthStr}-01`;

    return projectsPool.filter((project) => {
      return project.dates.some(
        (dateStr) => dateStr >= lowerFilterBorder && dateStr < upperFilterBorder
      );
    });
  };
}
