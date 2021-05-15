import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import THEME from "../constants/theme";

import BoxButton from "./shared/BoxButton";
import Title from "./shared/Title";
import VectorIcon from "./shared/VectorIcon";

function Form({ onSubmit, onClose, style }) {
  const [text, setText] = useState("");

  function handlePress() {
    if (text.length === 0) return;

    onSubmit(text);
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.close}>
        <TouchableOpacity onPress={onClose}>
          <VectorIcon
            type="FontAwesome"
            name="close"
            color={THEME.color.accent}
          />
        </TouchableOpacity>
      </View>
      <Title text="✈️여행의 제목" />
      <TextInput
        style={styles.textInput}
        placeholder="여행의 제목을 입력하세요."
        placeholderTextColor="gray"
        maxLength={10}
        onChangeText={setText}
      />
      <BoxButton
        text="저장"
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#ffff",
  },
  textInput: {
    width: 160,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "gray",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  close: {
    alignItems: "flex-end",
    width: 160,
  },
});

export default Form;
