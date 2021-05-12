import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import Schedule from "./shared/Schedule";
import { toggleSite } from "../reducers/favoriteSitesSlice";

function ScheduleContainer({ sites, onChange, style }) {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  function handleIndexPress(site) {
    if (!selected) {
      setSelected(site);
      return;
    }

    if (selected.fullName !== site.fullName) {
      swapIndex(selected, site);
    }

    setSelected(null);
  }

  function handleLikePress(site) {
    dispatch(toggleSite(site));
  }

  function swapIndex(site1, site2) {
    [site1.index, site2.index] = [site2.index, site1.index];
    onChange(sites.slice().sort((a, b) => a.index - b.index));
  }

  return (
    <ScrollView style={{ ...styles.container, ...style }}>
      {sites.map((site) => (
        <Schedule
          key={site.fullName}
          site={site}
          onIndexPress={handleIndexPress}
          onLikePress={handleLikePress}
          isSelected={selected && selected.fullName === site.fullName}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    paddingHorizontal: "5%",
    width: "100%",
  },
});

export default ScheduleContainer;
