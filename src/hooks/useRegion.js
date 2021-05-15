import { useState } from "react";

import calculateRegion from "../utils/calculateRegion";

function useRegion(regions = {}) {
  const [region, setRegion] = useState(() => {
    if (!Array.isArray(regions)) {
      return regions;
    }

    return calculateRegion(regions);
  });

  function changeRegion(sites) {
    if (!Array.isArray(sites)) {
      setRegion(sites);
      return;
    }

    setRegion(calculateRegion(sites));
  }

  return { region, changeRegion };
}

export default useRegion;
