/**
 * function to calculate delta and comblne with location informations
 * @param {object} location - from google place api
 * @param {object} viewport - from google place api
 * @returns region object
 */
function calculateRegion(location, viewport) {
  const { lat: latitude, lng: longitude } = location;
  const { northeast, southwest } = viewport;
  const latitudeDelta = northeast.lat - southwest.lat;
  const longitudeDelta = northeast.lng - southwest.lng;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
}

export default calculateRegion;
