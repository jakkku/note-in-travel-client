import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

function BoxButton({ onPress, text }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "10%",
    marginTop: "5%",
    borderRadius: 20,
    backgroundColor: "#DEDFE3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BoxButton;
