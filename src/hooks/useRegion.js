import { useState } from "react";

import calculateRegion from "../utils/calculateRegion";

function useRegion(inputRegion = {}) {
  const [region, setRegion] = useState(() => {
    let initialRegion = inputRegion;

    if (initialRegion.length > 0) {
      initialRegion = calculateRegion(initialRegion);
    }

    return initialRegion;
  });

  function changeRegion(sites) {
    setRegion(calculateRegion(sites));
  }

  return { region, changeRegion };
}

export default useRegion;
