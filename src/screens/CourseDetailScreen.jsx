import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import GoogleMap from "../components/shared/GoogleMap";
import ScheduleList from "../components/ScheduleList";

import fetchData from "../utils/fetchData";
import useRegion from "../hooks/useRegion";
import useMyLocation from "../hooks/useMyLocation";
import { selectMode } from "../reducers/modeSlice";

function CourseDetailScreen({ route }) {
  const curMode = useSelector(selectMode);

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const { region, changeRegion } = useRegion({});
  const myLocation = useMyLocation(curMode === "active");

  const { id } = route.params;

  useEffect(() => {
    (async function fetchCourseById(courseId) {
      try {
        const response = await fetchData("GET", `/course/${courseId}`);
        const sites = response.schedules.map((schedule) => schedule.site.region);

        setCourse(response);
        changeRegion(sites);
        setIsLoading(false);
      } catch (err) {
        // TODO: add error handling
        console.log(err.message);
      }
    })(id);
  }, [id]);

  // TODO: add loading component
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GoogleMap
        region={region}
        schedules={course.schedules}
        myLocation={myLocation}
        style={styles.map}
      />
      <ScheduleList schedules={course.schedules} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "40%",
    borderRadius: 20,
  },
});

export default CourseDetailScreen;
