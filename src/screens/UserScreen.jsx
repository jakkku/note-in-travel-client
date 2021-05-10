import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";

import Profile from "../components/Profile";
import { selectPhotoUrl, selectUserName } from "../reducers/userSlice";

function UserScreen() {
  const userName = useSelector(selectUserName);
  const photoUrl = useSelector(selectPhotoUrl);

  return (
    <View style={styles.container}>
      <Profile
        name={userName}
        photoUrl={photoUrl}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
});

export default UserScreen;
