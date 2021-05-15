import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Title from "./Title";
import CoursePreview from "./CoursePreview";

function CoursePreviewList({
  title,
  courses,
  onPreviewPress,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <Title text={title} />
      <ScrollView
        style={styles.scrollView}
        horizontal
      >
        {courses.map((course) => (
          <CoursePreview
            key={course._id}
            course={course}
            onPress={() => onPreviewPress(course._id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "30%",
  },
  scrollView: {
    paddingVertical: "5%",
  },
});

export default CoursePreviewList;
