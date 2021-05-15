import { useEffect, useState } from "react";

function useErrorMessage(initialState = null, delay = 2000) {
  const [errorMsg, setErrorMsg] = useState(initialState);

  useEffect(() => {
    if (errorMsg === null) return;

    const timer = setTimeout(() => setErrorMsg(null), delay);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  return { errorMsg, setErrorMsg };
}

export default useErrorMessage;
