import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { loginUser } from "../reducers/userSlice";
import loginWithGoogleAsync from "../utils/loginWithGoogleAsync";

function WelcomeScreen() {
  const isLoading = useSelector((state) => state.user.status === "pending");
  const dispath = useDispatch();

  async function handleClick() {
    const result = await loginWithGoogleAsync();

    if (!result.user) return;

    dispath(loginUser(result.user));
  }

  return (
    <View style={styles.container}>
      {isLoading
        ? <ActivityIndicator size="large" />
        : <Button title="Get Start" onPress={handleClick} />}
    </View>
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
