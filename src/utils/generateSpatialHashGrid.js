/**
 * factory function - generate 10 * 10 spatial hash grid
 * @param {object} region - of course
 * @param {array} items - to insert to grid
 * @returns grid having mothods
 */
function generateSpatialHashGrid(region = {}, items = []) {
  const result = Array.from({ length: 10 }).map(() => (
    Array.from({ length: 10 })
  ));
  const {
    latitude,
    latitudeDelta,
    longitude,
    longitudeDelta,
  } = region;
  const latOrigin = latitude - (latitudeDelta / 2);
  const lngOrigin = longitude - (longitudeDelta / 2);
  const dLat = latitudeDelta / 10;
  const dLng = longitudeDelta / 10;

  items.forEach((item) => {
    const { location } = item;
    const latIndex = Math.floor((location.latitude - latOrigin) / dLat);
    const lngIndex = Math.floor((location.longitude - lngOrigin) / dLng);
    const area = result[lngIndex][latIndex];

    result[lngIndex][latIndex] = area ? area.concat(item) : [item];
  });

  result.getIndices = (location) => {
    const latIndex = Math.floor((location.latitude - latOrigin) / dLat);
    const lngIndex = Math.floor((location.longitude - lngOrigin) / dLng);

    return { y: lngIndex, x: latIndex };
  };

  result.getByIndices = (x, y) => result[y][x];

  return result;
}

export default generateSpatialHashGrid;
