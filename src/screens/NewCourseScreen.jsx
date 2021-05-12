import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";

import ScheduleContainer from "../components/ScheduleContainer";
import BoxButton from "../components/shared/BoxButton";
import VectorIcon from "../components/shared/VectorIcon";
import SafeAreaBottom from "../components/shared/SafeAreaBottom";

import REGION from "../constants/region";
import calculateRegion from "../utils/calcutateRegion";
import { saveMyCourse } from "../reducers/myCoursesSlice";

const { height: screenHeight } = Dimensions.get("screen");

function NewCourseScreen({ navigation }) {
  const isLoading = useSelector((state) => state.myCourses.status);
  const dispatch = useDispatch();
  const [region, setRegion] = useState(REGION.korea);
  const [sites, setSites] = useState([]);

  function handleSearchPress(data, details = null) {
    const { location, viewport } = details.geometry;
    const nextRegion = calculateRegion(location, viewport);
    const {
      description: fullName,
      structured_formatting: { main_text: shortName },
    } = data;

    setSites((prev) => prev.concat({
      index: prev.length + 1,
      shortName,
      fullName,
      region: nextRegion,
    }));
    setRegion(nextRegion);
  }

  async function handleSavePress() {
    if (isLoading === "pending" || sites.length === 0) return;

    const actionResult = await dispatch(saveMyCourse(sites));

    try {
      const myCourse = unwrapResult(actionResult);

      navigation.navigate("CourseDetail", { id: myCourse._id });
    } catch (err) {
      // TODO: add error handling
      console.log(err);
    }
  }

  if (isLoading === "pending") {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
      >
        {sites.map((site) => (
          <Marker
            key={site.fullName}
            coordinate={{ ...site.region }}
            title={site.shortName}
            description={site.fullName}
          />
        ))}
      </MapView>
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
      <ScheduleContainer
        sites={sites}
        onChange={setSites}
      />
      <BoxButton
        text="SAVE"
        onPress={handleSavePress}
      >
        <VectorIcon
          name="plus-circle"
          color="#FE7762"
        />
      </BoxButton>
      <SafeAreaBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  map: {
    width: "100%",
    height: "40%",
    borderRadius: 20,
  },
  searchBarContainer: {
    position: "absolute",
    width: "90%",
    height: "20%",
    top: screenHeight * (4.2 / 10),
    left: "5%",
    zIndex: 1,
  },
});

export default NewCourseScreen;
