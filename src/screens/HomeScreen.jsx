import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Profile from "../components/shared/Profile";
import GoogleMap from "../components/shared/GoogleMap";
import IconButton from "../components/shared/IconButton";
import REGION from "../constants/region";

import THEME from "../constants/theme";
import fetchData from "../utils/fetchData";
import generateSpatialHashGrid from "../utils/generateSpatialHashGrid";

function HomeScreen({ navigation }) {
  const { name, photoUrl } = useSelector((state) => state.user.value);
  const [courses, setCourses] = useState([]);
  const segments = useMemo(() => {
    if (!courses) return;

    return generateSpatialHashGrid(REGION.korea, courses)
      .flat()
      .filter((segment) => segment);
  }, [courses]);

  useFocusEffect(useCallback(() => {
    (async function () {
      const response = await fetchData("GET", "/course");

      setCourses(response);
    })();
  }, []));

  function handlePress() {
    navigation.navigate("NewCourse");
  }

  // TODO: add region segment page
  function handleSegmentPress(segment) {
    console.log(segment);
  }

  return (
    <View style={styles.container}>
      <GoogleMap
        style={styles.maps}
        region={REGION.korea}
        zoomEnabled={false}
        scrollEnabled={false}
        segments={segments}
        onSegmentPress={handleSegmentPress}
      />
      <Profile
        name={name}
        photoUrl={photoUrl}
      />
      <IconButton
        style={styles.button}
        name="plus-circle"
        color={THEME.color.accent}
        size={40}
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  maps: {
    height: "70%",
    borderRadius: 20,
  },
  button: {
    height: "10%",
  },
});

export default HomeScreen;
