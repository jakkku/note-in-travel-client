import { useEffect, useState } from "react";
import * as Location from "expo-location";

function useMyLocation(isActive, options = { accuracy: Location.Accuracy.Highest, distanceInterval: 5, timeInterval: 100 }) {
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    if (!isActive) return;

    let watchId;

    (async function () {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        // TODO: add error handling
        console.log("Permission to access location was denied.");
        return;
      }

      watchId = await Location.watchPositionAsync(
        options,
        ({ coords: { latitude, longitude } }) => setMyLocation({ latitude, longitude }),
      );
    })();

    return () => {
      watchId.remove();
      setMyLocation(null);
    };
  }, [isActive]);

  return myLocation;
}

export default useMyLocation;