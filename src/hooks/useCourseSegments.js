import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import REGION from "../constants/region";
import fetchData from "../utils/fetchData";
import generateSpatialHashGrid from "../utils/generateSpatialHashGrid";

function useCourseSegments(initialState) {
  const [courses, setCourses] = useState(initialState);
  const [error, setError] = useState(null);
  const segments = useMemo(generateSegments, [courses]);

  useFocusEffect(useCallback(() => {
    (async function () {
      try {
        const response = await fetchData("GET", "/course");
        setCourses(response);
      } catch (err) {
        setError(err);
      }
    })();
  }, []));

  function generateSegments() {
    if (!courses) return;

    return generateSpatialHashGrid(REGION.korea, courses)
      .flat()
      .filter((segment) => segment);
  }

  return { segments, error };
}

export default useCourseSegments;
