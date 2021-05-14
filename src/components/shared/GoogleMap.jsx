import React from "react";
import { Image, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import IndexMarker from "./IndexMarker";
import character from "../../../assets/backpack.png";

function GoogleMap({
  region,
  schedules = [],
  myLocation,
  style,
}) {
  return (
    <MapView
      style={[styles.map, style]}
      provider={PROVIDER_GOOGLE}
      region={region}
    >
      {myLocation && (
        <Marker coordinate={myLocation}>
          <Image source={character} style={{ width: 40, height: 40 }} />
        </Marker>
      )}
      {schedules.map(({ site, index }) => (
        <IndexMarker
          key={site.fullName}
          coordinate={site.region}
          index={index}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default GoogleMap;
