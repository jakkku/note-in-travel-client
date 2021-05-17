import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Title from "../components/shared/Title";
import GoogleMap from "../components/shared/GoogleMap";
import ModalWithBackground from "../components/shared/ModalWithBackground";
import ScheduleList from "../components/ScheduleList";
import TextInputForm from "../components/TextInputForm";

import fetchData from "../utils/fetchData";
import useRegion from "../hooks/useRegion";
import useMyLocation from "../hooks/useMyLocation";
import useErrorMessage from "../hooks/useErrorMsg";
import generateSpatialHashGrid from "../utils/generateSpatialHashGrid";

function CourseDetailScreen({
  route,
  isActiveMode,
  isMessageFormOpen,
  onMessageFormClose,
  onMessageSubmit,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState({});
  const { region, changeRegion } = useRegion({});
  const myLocation = useMyLocation(isActiveMode);
  const { errorMsg, setErrorMsg } = useErrorMessage(null);

  const [myIndices, setMyIndices] = useState({});
  const spatialHashGrid = useMemo(
    () => generateSpatialHashGrid(region, course.messages),
    [region, course.messages],
  );

  useEffect(() => {
    if (!spatialHashGrid || !myLocation) return;

    const { latitude: myLat, longitude: myLng } = myLocation;
    const newMyIndices = spatialHashGrid.getIndices(myLat, myLng);

    if (!newMyIndices) return;

    setMyIndices(newMyIndices);
  }, [spatialHashGrid, myLocation]);

  const nearbyMessages = useMemo(
    () => {
      if (!spatialHashGrid) return;

      return spatialHashGrid.getWithNearbyByIndices(myIndices.x, myIndices.y);
    },
    [spatialHashGrid, myIndices.x, myIndices.y],
  );

  const { id } = route.params;

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    (async function fetchCourseById(courseId) {
      try {
        const response = await fetchData("GET", `/course/${courseId}`);
        const sites = response.schedules.map((schedule) => schedule.site.region);

        if (isCancelled) return;

        setCourse(response);
        changeRegion(sites);
        setIsLoading(false);
      } catch (err) {
        setErrorMsg(err.message);
      }
    })(id);

    return () => {
      isCancelled = true;
    };
  }, [id]);

  async function handleMessageSubmitAsync(content) {
    try {
      if (!myIndices) {
        setErrorMsg("코스 영역 밖에 있습니다.");
        return;
      }

      const message = { content, location: myLocation };
      const response = await fetchData("POST", `/course/${id}`, message);

      setCourse((prev) => ({
        ...prev,
        messages: prev.messages.concat(response),
      }));
      onMessageSubmit();
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  return (
    <View style={styles.container}>
      {isLoading
        ? <ActivityIndicator size="large" />
        : (
          <>
            <GoogleMap
              region={region}
              schedules={course.schedules}
              myLocation={myLocation}
              messages={nearbyMessages}
              style={styles.map}
            />
            <Title text={`${course.creator.name}의 ${course.name}`} />
            <ScheduleList schedules={course.schedules} />
            <ModalWithBackground isOpen={isMessageFormOpen}>
              {errorMsg && isMessageFormOpen && <Title text={errorMsg} />}
              <TextInputForm
                placeholder="쪽지 내용을 입력하세요."
                onSubmit={handleMessageSubmitAsync}
                onClose={onMessageFormClose}
              />
            </ModalWithBackground>
          </>
        )}
      {errorMsg && !isMessageFormOpen && <Title text={errorMsg} />}
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

export default React.memo(CourseDetailScreen);
