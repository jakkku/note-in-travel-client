import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";

function GoogleSearchBar({ onPress, style, debounce = 1000 }) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <GooglePlacesAutocomplete
        styles={{ container: styles.searchBarContainer }}
        placeholder="Search"
        fetchDetails
        onPress={onPress}
        query={{
          key: GOOGLE_API_KEY,
          language: "ko",
        }}
        debounce={debounce}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    width: "100%",
    height: "5%",
    marginTop: "5%",
    zIndex: 1,
  },
  searchBarContainer: {
    position: "absolute",
    width: "90%",
    height: 200,
  },
});

export default GoogleSearchBar;
