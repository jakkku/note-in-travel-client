import calculateViewport from "./calcutateViewport";

function calculateRegion(regions, viewPadding = 1.5) {
  const result = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  };
  let northeast = { latitude: 0, longitude: 0 };
  let southwest = { latitude: 0, longitude: 0 };

  regions.forEach((region, index) => {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    } = region;

    result.latitude += latitude;
    result.longitude += longitude;

    if (index === 0) {
      result.latitudeDelta = latitudeDelta;
      result.longitudeDelta = longitudeDelta;

      northeast = { latitude, longitude };
      southwest = { latitude, longitude };
      return;
    }

    northeast.latitude = Math.max(northeast.latitude, latitude);
    northeast.longitude = Math.max(northeast.longitude, longitude);
    southwest.latitude = Math.min(southwest.latitude, latitude);
    southwest.longitude = Math.min(southwest.longitude, longitude);
  });

  const { latitudeDelta, longitudeDelta } = calculateViewport(northeast, southwest);

  if (latitudeDelta !== 0) {
    result.latitudeDelta = latitudeDelta;
  }

  if (longitudeDelta !== 0) {
    result.longitudeDelta = longitudeDelta;
  }

  result.latitude /= regions.length;
  result.longitude /= regions.length;
  result.latitudeDelta *= viewPadding;
  result.longitudeDelta *= viewPadding;

  return result;
}

export default calculateRegion;
