import React from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import LikeButton from "./shared/LikeButton";

import THEME from "../constants/theme";
import { selectFavoriteSites } from "../reducers/favoriteSitesSlice";

function Schedule({
  schedule: { index: scheduleIndex, site },
  onIndexPress,
  onLikePress,
  accent,
}) {
  const favoriteSites = useSelector(selectFavoriteSites);
  const isFavorite = favoriteSites.find((favoriteSite) => favoriteSite.fullName === site.fullName);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[styles.indexContainer, accent && styles.accent]}
          onPress={() => onIndexPress(scheduleIndex)}
        >
          <Text style={styles.index}>{scheduleIndex}</Text>
        </TouchableOpacity>
        <View style={styles.dash} />
      </View>
      <View style={styles.namesContainer}>
        <Text style={styles.shortName}>{site.shortName}</Text>
        <Text>{site.fullName}</Text>
      </View>
      <LikeButton
        isClicked={isFavorite}
        onPress={() => onLikePress(site)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  indexContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.color.primitive,
  },
  accent: {
    backgroundColor: THEME.color.accent,
  },
  index: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  dash: {
    width: 21,
    height: 30,
    marginVertical: 10,
    borderRightWidth: 2,
    borderStyle: "solid",
    borderColor: THEME.color.primitive,
  },
  namesContainer: {
    width: "80%",
    padding: "3%",
  },
  shortName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Schedule;
