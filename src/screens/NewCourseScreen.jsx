import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import BoxButton from "../components/shared/BoxButton";
import VectorIcon from "../components/shared/VectorIcon";
import SafeArea from "../components/shared/SafeArea";
import GoogleMap from "../components/shared/GoogleMap";
import GoogleSearchBar from "../components/shared/GoogleSearchBar";
import ScheduleList from "../components/ScheduleList";

import REGION from "../constants/region";
import THEME from "../constants/theme";
import useRegion from "../hooks/useRegion";
import { saveMyCourse } from "../reducers/myCoursesSlice";
import calcutateViewport from "../utils/calcutateViewport";

function NewCourseScreen({ navigation }) {
  const isLoading = useSelector((state) => state.myCourses.status);
  const dispatch = useDispatch();

  const { region, changeRegion } = useRegion(REGION.korea);
  const [schedules, setSchedules] = useState([]);

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

    const newSchedule = {
      index: schedules.length + 1,
      site: {
        shortName,
        fullName,
        region: nextRegion,
      },
    };
    const newSchedules = schedules.concat(newSchedule);

    setSchedules(newSchedules);
    changeRegion(newSchedules.map((schedule) => schedule.site.region));
  }

  async function handleSavePressAsync() {
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
      <GoogleMap
        style={styles.map}
        region={region}
        schedules={schedules}
      />
      <GoogleSearchBar onPress={handleSearchPress} />
      <ScheduleList
        schedules={schedules}
        onChange={setSchedules}
      />
      <BoxButton
        text="SAVE"
        onPress={handleSavePressAsync}
      >
        <VectorIcon
          name="plus-circle"
          color={THEME.color.accent}
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
    height: "40%",
    borderRadius: 20,
  },
});

export default NewCourseScreen;
