import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import BoxButton from "../components/shared/BoxButton";
import VectorIcon from "../components/shared/VectorIcon";
import SafeArea from "../components/shared/SafeArea";
import GoogleSearchBar from "../components/shared/GoogleSearchBar";
import ScheduleContainer from "../components/ScheduleContainer";

import REGION from "../constants/region";
import calcutateViewport from "../utils/calcutateViewport";
import { saveMyCourse } from "../reducers/myCoursesSlice";

function NewCourseScreen({ navigation }) {
  const [region, setRegion] = useState(REGION.korea);
  const [schedules, setSchedules] = useState([]);

  const isLoading = useSelector((state) => state.myCourses.status);
  const dispatch = useDispatch();

  function handleSearchPress(
    data,
    { geometry: { location, viewport } },
  ) {
    const { northeast, southwest } = viewport;
    const { latitudeDelta, longitudeDelta } = calcutateViewport(northeast, southwest);
    const { lat: latitude, lng: longitude } = location;
    const nextRegion = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
    const {
      description: fullName,
      structured_formatting: { main_text: shortName },
    } = data;

    setSchedules((prev) => prev.concat({
      index: prev.length + 1,
      site: {
        shortName,
        fullName,
        region: nextRegion,
      },
    }));
    setRegion(nextRegion);
  }

  async function handleSavePress() {
    if (isLoading === "pending" || schedules.length === 0) return;

    try {
      const actionResult = await dispatch(saveMyCourse(schedules));
      const myCourse = unwrapResult(actionResult);

      navigation.navigate("CourseDetail", { id: myCourse._id });
    } catch (err) {
      // TODO: add error handling
      console.log(err.message);
    }
  }

  if (isLoading === "pending") {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
      >
        {schedules.map(({ site }) => (
          <Marker
            key={site.fullName}
            coordinate={{ ...site.region }}
            title={site.shortName}
            description={site.fullName}
          />
        ))}
      </MapView>
      <GoogleSearchBar onPress={handleSearchPress} />
      <ScheduleContainer
        schedules={schedules}
        onChange={setSchedules}
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
      <SafeArea />
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
});

export default NewCourseScreen;
