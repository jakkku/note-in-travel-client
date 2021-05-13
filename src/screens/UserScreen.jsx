import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Button } from "react-native";

import Profile from "../components/shared/Profile";
import SafeArea from "../components/shared/SafeArea";

function UserScreen({ navigation }) {
  const { name, photoUrl } = useSelector((state) => state.user.value);
  const myCourses = useSelector((state) => state.myCourses.items);

  function handlePress(courseId) {
    navigation.navigate("CourseDetail", { id: courseId });
  }

  return (
    <View style={styles.container}>
      <SafeArea />
      <Profile
        name={name}
        photoUrl={photoUrl}
      />
      {/* {TODO: edit this} */}
      {myCourses.map((course) => (
        <Button key={course._id} title={course._id} onPress={() => handlePress(course._id)} />
      ))}
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
