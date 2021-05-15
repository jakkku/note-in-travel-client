import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import Profile from "../components/shared/Profile";
import REGION from "../constants/region";
import IconButton from "../components/shared/IconButton";

import THEME from "../constants/theme";

function HomeScreen({ navigation }) {
  const { name, photoUrl } = useSelector((state) => state.user.value);

  function handlePress() {
    navigation.navigate("NewCourse");
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
    width: "100%",
    height: "70%",
    borderRadius: 20,
  },
  button: {
    height: "10%",
  },
});

export default HomeScreen;
