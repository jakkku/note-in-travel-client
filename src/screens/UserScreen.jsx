import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";

import Profile from "../components/shared/Profile";

function UserScreen() {
  const { name, photoUrl } = useSelector((state) => state.user.value);
  const myCourses = useSelector((state) => state.myCourses.items);

  return (
    <View style={styles.container}>
      <Profile
        name={name}
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
