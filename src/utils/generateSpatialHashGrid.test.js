import generateSpatialHashGrid from "./generateSpatialHashGrid";

describe(">>> UTILS --- GENERATE SPATIAL HASH GIRD", () => {
  const region = {
    latitude: 37.49737295,
    latitudeDelta: 0.00965114999999983,
    longitude: 127.03876335,
    longitudeDelta: 0.004612950000009164,
  };

  const items = [
    {
      id: 1,
      location: {
        latitude: 37.49737295,
        longitude: 127.03876335,
      },
    },
    {
      id: 2,
      location: {
        latitude: 37.49737295 + 0.00046511499999998,
        longitude: 127.03876335,
      },
    },
    {
      id: 3,
      location: {
        latitude: 37.49737295 + 0.00046511499999998,
        longitude: 127.03876335,
      },
    },
  ];

  it("+++ CONSTRUCT --- generate 10 * 10 grid", () => {
    expect(generateSpatialHashGrid(region).length).toBe(10);
    expect(generateSpatialHashGrid(region)[0].length).toBe(10);
  });

  it("+++ CONSTRUCT --- insert item", () => {
    expect(generateSpatialHashGrid(region, items)[4][4].length).toBe(1);
    expect(generateSpatialHashGrid(region, items)[4][5].length).toBe(2);
  });

  it("+++ METHOD --- return indices", () => {
    const { x, y } = generateSpatialHashGrid(region, items)
      .getIndices(items[0].location);

    expect(x).toBe(4);
    expect(y).toBe(4);
  });

  it("+++ METHOD --- return by indices", () => {
    const spatialHashGrid = generateSpatialHashGrid(region, items);
    const { x, y } = spatialHashGrid.getIndices(items[0].location);

    expect(spatialHashGrid.getByIndices(x, y)[0]).toBe(items[0]);
  });
});
