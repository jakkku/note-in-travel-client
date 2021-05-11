import React from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import VectorIcon from "./shared/VectorIcon";

function Schedule({ index, site }) {
  const favoriteSites = useSelector((state) => state.user.value.favoriteSites);
  const isFavorite = favoriteSites.find((favoriteSite) => favoriteSite.fullName === site.fullName);

  function handleFavoritePress() {}

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.indexContainer}>
          <Text style={styles.index}>{index}</Text>
        </View>
        <View style={styles.dash} />
      </View>
      <View style={styles.namesContainer}>
        <Text style={styles.shortName}>{site.shortName}</Text>
        <Text>{site.fullName}</Text>
      </View>
      <TouchableOpacity>
        <VectorIcon
          type="FontAwesome"
          name={isFavorite ? "heart" : "heart-o"}
          color="#FE7762"
          onPress={handleFavoritePress}
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
