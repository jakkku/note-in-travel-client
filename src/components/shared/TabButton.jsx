import React from "react";
import { TouchableOpacity } from "react-native";

import VectorIcon from "./VectorIcon";

function TabButton({
  name,
  type,
  onPress,
  style,
}) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
    >
      <VectorIcon type={type} name={name} />
    </TouchableOpacity>
  );
}

export default TabButton;
