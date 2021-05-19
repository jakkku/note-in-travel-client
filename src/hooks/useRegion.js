import { useState } from "react";

import calculateRegion from "../utils/calculateRegion";

function useRegion(regions = {}, viewPadding) {
  const [region, setRegion] = useState(() => verifyRegion(regions, viewPadding));

  function changeRegion(sites, changedViewPadding) {
    const verified = verifyRegion(sites, changedViewPadding);

    setRegion(verified);
  }

  function verifyRegion(rowRegions, rowViewPadding) {
    return Array.isArray(rowRegions)
      ? calculateRegion(rowRegions, rowViewPadding)
      : rowRegions;
  }

  return { region, changeRegion };
}

export default useRegion;
