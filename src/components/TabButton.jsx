import React from "react";
import { TouchableOpacity } from "react-native";

import VectorIcon from "./shared/VectorIcon";

function TabButton({
  name,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <VectorIcon name={name} />
    </TouchableOpacity>
  );
}

export default TabButton;
