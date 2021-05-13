import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import ScheduleContainer from "../components/ScheduleContainer";

import fetchData from "../utils/fetchData";
import useRegion from "../hooks/useRegion";

function CourseDetailScreen({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const { region, changeRegion } = useRegion({});
  const { id } = route.params;

  useEffect(() => {
    if (course || !id) return;

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
  }, [course, id]);

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
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
      >
        {course.schedules.map(({ site }) => (
          <Marker
            key={site.fullName}
            coordinate={{ ...site.region }}
            title={site.shortName}
            description={site.fullName}
          />
        ))}
      </MapView>
      <ScheduleContainer schedules={course.schedules} />
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
