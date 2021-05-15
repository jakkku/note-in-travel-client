import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Title from "../components/shared/Title";
import GoogleMap from "../components/shared/GoogleMap";
import ScheduleList from "../components/ScheduleList";

import fetchData from "../utils/fetchData";
import useRegion from "../hooks/useRegion";
import useMyLocation from "../hooks/useMyLocation";
import useErrorMessage from "../hooks/useErrorMsg";
import { selectMode } from "../reducers/modeSlice";

function CourseDetailScreen({ route }) {
  const curMode = useSelector(selectMode);

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const { region, changeRegion } = useRegion({});
  const myLocation = useMyLocation(curMode === "active");
  const { errorMsg, setErrorMsg } = useErrorMessage(null);

  const { id } = route.params;

  useEffect(() => {
    let isCancel = false;

    setIsLoading(true);
    (async function fetchCourseById(courseId) {
      try {
        const response = await fetchData("GET", `/course/${courseId}`);
        const sites = response.schedules.map((schedule) => schedule.site.region);

        if (isCancel) return;

        setCourse(response);
        changeRegion(sites);
        setIsLoading(false);
      } catch (err) {
        setErrorMsg(err.message);
      }
    })(id);

    return () => {
      isCancel = true;
    };
  }, [id]);

  return (
    <View style={styles.container}>
      {errorMsg && <Title text={errorMsg} />}
      {isLoading
        ? <ActivityIndicator size="large" />
        : (
          <>
            <GoogleMap
              region={region}
              schedules={course.schedules}
              myLocation={myLocation}
              style={styles.map}
            />
            <Title text={`${course.creator.name}의 ${course.name}`} />
            <ScheduleList schedules={course.schedules} />
          </>
        )}
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
