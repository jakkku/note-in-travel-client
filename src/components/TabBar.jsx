import React from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "./IconButton";

function TabBar({ navigation }) {
  const nav = navigation.navigation;

  return (
    <View style={styles.container}>
      <IconButton
        name="home"
        onPress={() => nav.navigate("home")}
      />
      <IconButton
        name="user-alt"
        onPress={() => nav.navigate("user")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "12%",
    paddingHorizontal: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#4FD4C2",
  },
});

export default TabBar;
