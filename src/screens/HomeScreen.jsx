import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import Profile from "../components/Profile";
import REGION from "../constants/region";
import BoxButton from "../components/BoxButton";
import { selectPhotoUrl, selectUserName } from "../reducers/userSlice";

function MainScreen({ navigation }) {
  const userName = useSelector(selectUserName);
  const photoUrl = useSelector(selectPhotoUrl);

  function handlePress() {
    navigation.navigate("NewCourseScreen");
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        provider={PROVIDER_GOOGLE}
        region={REGION.korea}
        zoomEnabled={false}
        scrollEnabled={false}
      />
      <Profile
        name={userName}
        photoUrl={photoUrl}
      />
      <BoxButton
        text="Create New Course"
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  maps: {
    width: "100%",
    height: "70%",
    borderRadius: 20,
  },
});

export default MainScreen;
