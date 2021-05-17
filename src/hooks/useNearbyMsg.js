import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import generateSpatialHashGrid from "../utils/generateSpatialHashGrid";

function useNearbyMsg(region, messages, myLocation) {
  const [myIndices, setMyIndices] = useState({});
  const spatialHashGrid = useMemo(
    () => generateSpatialHashGrid(region, messages),
    [region, messages],
  );
  const nearbyMessages = useMemo(
    () => {
      if (!spatialHashGrid || !myLocation) return;

      return spatialHashGrid.getWithNearbyByIndices(myIndices.x, myIndices.y);
    },
    [spatialHashGrid, myIndices.x, myIndices.y],
  );

  useFocusEffect(useCallback(() => {
    if (!spatialHashGrid || !myLocation) return;

    const { latitude: myLat, longitude: myLng } = myLocation;
    const newMyIndices = spatialHashGrid.getIndices(myLat, myLng);

    if (!newMyIndices) return;

    setMyIndices(newMyIndices);
    return () => setMyIndices({});
  }, [spatialHashGrid, myLocation]));

  return { nearbyMessages, myIndices };
}

export default useNearbyMsg;
