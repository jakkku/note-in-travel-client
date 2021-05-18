import { useState } from "react";

import calculateRegion from "../utils/calculateRegion";

function useRegion(regions = {}, viewPadding) {
  const [region, setRegion] = useState(() => {
    if (!Array.isArray(regions)) {
      return regions;
    }

    return calculateRegion(regions, viewPadding);
  });

  function changeRegion(sites, changedViewPadding) {
    if (!Array.isArray(sites)) {
      setRegion(sites);
      return;
    }

    setRegion(calculateRegion(sites, changedViewPadding));
  }

  return { region, changeRegion };
}

export default useRegion;
