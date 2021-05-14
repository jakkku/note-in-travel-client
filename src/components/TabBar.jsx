import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import TabButton from "./shared/TabButton";
import THEME from "../constants/theme";
import { selectMode, toggleMode } from "../reducers/modeSlice";

function TabBar({ navigation, state }) {
  const curMode = useSelector(selectMode);
  const dispatch = useDispatch();

  const nav = navigation;
  const curRouteName = state.routeNames[state.index];

  function handleActivePress() {
    dispatch(toggleMode());
  }

  return (
    <View style={styles.container}>
      <TabButton
        name="home"
        onPress={() => nav.navigate("Home")}
      />
      <TabButton
        name="user-alt"
        onPress={() => nav.navigate("User")}
      />
      {curRouteName === "CourseDetail" && (
        <View style={styles.activeButtonContainer}>
          <TabButton
            style={styles.activeButton}
            name={curMode === "idle" ? "plane-departure" : "paper-plane"}
            onPress={handleActivePress}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "12%",
    paddingHorizontal: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: THEME.color.primitive,
  },
  activeButtonContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "-15%",
    left: 0,
    right: 0,
    zIndex: -1,
  },
  activeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.color.accent,
  },
});

export default TabBar;
