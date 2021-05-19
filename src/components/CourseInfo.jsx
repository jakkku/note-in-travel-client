import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import Title from "./shared/Title";
import IconButton from "./shared/IconButton";
import VectorIcon from "./shared/VectorIcon";

import THEME from "../constants/theme";
import { selectUser } from "../reducers/userSlice";
import { selectFavoriteCourseByCourseId } from "../reducers/favoriteCoursesSlice";

function CourseInfo({ course = {}, onBookmarkPress, style }) {
  const { _id: useId } = useSelector(selectUser);
  const isBookmarked = useSelector((state) => !!selectFavoriteCourseByCourseId(state, course._id));

  const awardPoint = calculateAwardPoint(course);
  const isMyCourse = useId === course.creator._id;

  function calculateAwardPoint({ favorites, messages }) {
    const favoritesPoint = favorites?.length * 2 ?? 0;
    const messagesPoint = messages?.length ?? 0;

    return favoritesPoint + messagesPoint;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.award}>
          <VectorIcon name="award" color={THEME.color.accent} />
          <Text>{awardPoint}</Text>
        </View>
        {isMyCourse && (
          <IconButton
            type="FontAwesome"
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            color={THEME.color.primitive}
            onPress={onBookmarkPress}
          />
        )}
      </View>
      <View style={styles.body}>
        <Title text={course.name} />
        <Text>{` by ${course.creator.name}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    height: "11%",
    marginTop: "5%",
    paddingHorizontal: "5%",
    paddingVertical: "4%",
    borderRadius: 20,
    backgroundColor: "#DEDFE3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
  },
  award: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 45,
  },
  body: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
    width: "100%",
  },
});

export default React.memo(CourseInfo);
