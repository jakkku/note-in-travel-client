import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { loginUser } from "../../reducers/userSlice";
import loginWithGoogleAsync from "../../utils/loginWithGoogleAsync";

function WelcomeScreen({ navigation }) {
  const loginStatus = useSelector((state) => state.user.status);
  const dispath = useDispatch();

  async function handleClick() {
    const result = await loginWithGoogleAsync();

    if (!result.user) {
      // TODO: delete this
      console.log(`cancelled: ${result.cancelled || "none"}, error: ${result.error || "none"}`);
      return;
    }

    try {
      const actionResult = await dispath(loginUser(result.user));

      unwrapResult(actionResult);
      navigation.navigate("main");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <View style={styles.container}>
        {loginStatus === "pending"
        && <ActivityIndicator size="large" />}
        {loginStatus === "idle"
        && <Button title="Get Start" onPress={handleClick} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
