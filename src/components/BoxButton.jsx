import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

function BoxButton({
  text,
  onPress,
  children,
  style,
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BoxButton;
