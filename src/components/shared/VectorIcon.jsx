import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

function VectorIcon({
  type = "FontAwesome5",
  name,
  color = "white",
}) {
  return (
    <>
      {type === "FontAwesome5" && (
        <FontAwesome5
          name={name}
          size={25}
          color={color}
        />
      )}
      {type === "FontAwesome" && (
        <FontAwesome
          name={name}
          size={25}
          color={color}
        />
      )}
    </>
  );
}

export default VectorIcon;
