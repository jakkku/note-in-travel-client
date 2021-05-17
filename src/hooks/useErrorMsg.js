import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

function useErrorMessage(initialState = null, delay = 2000) {
  const [errorMsg, setErrorMsg] = useState(initialState);

  useFocusEffect(useCallback(() => {
    if (errorMsg === null) return;

    const timer = setTimeout(() => setErrorMsg(null), delay);
    return () => clearTimeout(timer);
  }, [errorMsg, delay]));

  return { errorMsg, setErrorMsg };
}

export default useErrorMessage;
