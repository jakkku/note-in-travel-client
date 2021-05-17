import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import fetchData from "../utils/fetchData";

function useCourses(initialState = []) {
  const [courses, setCourses] = useState(initialState);

  useFocusEffect(useCallback(() => {
    (async function () {
      try {
        const response = await fetchData("GET", "/course");
        setCourses(response);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []));

  return courses;
}

export default useCourses;
