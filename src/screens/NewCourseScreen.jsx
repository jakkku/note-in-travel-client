import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";

import REGION from "../constants/region";
import calculateRegion from "../utils/calcutateRegion";

function NewCourseScreen() {
  const [region, setRegion] = useState(REGION.korea);
  const [sites, setSites] = useState([]);

  function handleSearchPress(data, details = null) {
    const { location, viewport } = details.geometry;
    const nextRegion = calculateRegion(location, viewport);
    const {
      description: fullName,
      structured_formatting: { main_text: shortName },
    } = data;

    setSites((prev) => prev.concat({ shortName, fullName, region: nextRegion }));
    setRegion(nextRegion);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
      />
      <GooglePlacesAutocomplete
        styles={{ container: styles.searchBarContainer }}
        placeholder="Search"
        fetchDetails
        onPress={handleSearchPress}
        query={{
          key: GOOGLE_API_KEY,
          language: "ko",
        }}
        debounce={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    width: "100%",
  },
  map: {
    width: "100%",
    height: "40%",
    borderRadius: 20,
  },
  searchBarContainer: {
    marginTop: "5%",
    marginHorizontal: "5%",
  },
});

export default NewCourseScreen;
