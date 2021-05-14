import React from "react";
import { TouchableOpacity } from "react-native";

import VectorIcon from "./VectorIcon";

import THEME from "../../constants/theme";

function LikeButton({ isClicked, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <VectorIcon
        type="FontAwesome"
        name={isClicked ? "heart" : "heart-o"}
        color={THEME.color.accent}
      />
    </TouchableOpacity>
  );
}

export default LikeButton;
