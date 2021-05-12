import React from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import VectorIcon from "./VectorIcon";

function Schedule({
  site,
  onIndexPress,
  onLikePress,
  isSelected,
}) {
  const favoriteSites = useSelector((state) => state.favoriteSites.items);
  const isFavorite = favoriteSites?.find((favoriteSite) => favoriteSite.fullName === site.fullName);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[styles.indexContainer, isSelected && styles.selectedIndexContainer]}
          onPress={() => onIndexPress(site)}
        >
          <Text style={styles.index}>{site.index}</Text>
        </TouchableOpacity>
        <View style={styles.dash} />
      </View>
      <View style={styles.namesContainer}>
        <Text style={styles.shortName}>{site.shortName}</Text>
        <Text>{site.fullName}</Text>
      </View>
      <TouchableOpacity onPress={() => onLikePress(site)}>
        <VectorIcon
          type="FontAwesome"
          name={isFavorite ? "heart" : "heart-o"}
          color="#FE7762"
        />
      </TouchableOpacity>
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
    backgroundColor: "#4FD4C2",
  },
  selectedIndexContainer: {
    backgroundColor: "#FE7762",
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
    borderColor: "#4FD4C2",
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
