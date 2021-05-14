import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Title from "./Title";

function BoxButton({
  text,
  onPress,
  children,
  style,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Title text={text} />
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
    padding: "8%",
    borderRadius: 20,
    backgroundColor: "#DEDFE3",
  },
});

export default BoxButton;
