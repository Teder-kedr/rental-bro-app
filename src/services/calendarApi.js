import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "./firestore";
import store from "@/plugins/store";
import { datesFromServer } from "./formatProjectDate";

export function monthlyProjectsGetter() {
  const projectsPool = [];
  const memoizationCache = new Map();

  return async (navYear, navMonthStr, isGoingForward) => {
    const stringToQuery = `${navYear}-${navMonthStr}-01`;

    // getting memoized data
    if (memoizationCache.has(stringToQuery)) {
      return memoizationCache.get(stringToQuery);
    }

    const lowerFilterBorder = stringToQuery;
    const upperFilterBorder = getUpperFilterBorder(navYear, navMonthStr);

    // getting data from pool
    if (isGoingForward) {
      const result = projectsPool.filter((project) => {
        return project.dates.some(
          (dateStr) =>
            dateStr >= lowerFilterBorder && dateStr < upperFilterBorder
        );
      });

      memoizationCache.set(stringToQuery, result);
      return result;
    }

    // fetching data...
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

    const result = projectsPool.filter((project) => {
      return project.dates.some(
        (dateStr) => dateStr >= lowerFilterBorder && dateStr < upperFilterBorder
      );
    });

    memoizationCache.set(stringToQuery, result);
    return result;
  };
}

function getUpperFilterBorder(year, month) {
  let nextMonthStr = String(parseInt(month) + 1).padStart(2, "0");
  let nextYear;
  if (nextMonthStr === "12") {
    nextMonthStr = "01";
    nextYear = year + 1;
  } else {
    nextYear = year;
  }

  return `${nextYear}-${nextMonthStr}-01`;
}
