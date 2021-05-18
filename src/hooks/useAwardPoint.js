import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

function useAwardPoint(course) {
  const [awardPoint, setAwardPoint] = useState(calculateAwardPoint(course));

  useFocusEffect(useCallback(() => {
    chageAwardPoint(course);
  }, [course]));

  function chageAwardPoint(newCourse) {
    setAwardPoint(calculateAwardPoint(newCourse));
  }

  function calculateAwardPoint({ favorites, messages }) {
    const favoritesPoint = favorites?.length * 2 ?? 0;
    const messagesPoint = messages?.length ?? 0;

    return favoritesPoint + messagesPoint;
  }

  return { awardPoint, chageAwardPoint };
}

export default useAwardPoint;
