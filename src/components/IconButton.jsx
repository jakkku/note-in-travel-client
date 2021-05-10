import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

function IconButton({ name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome5
        name={name}
        size={25}
        color="white"
      />
    </TouchableOpacity>
  );
}

export default IconButton;
