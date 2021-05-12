import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import Schedule from "./Schedule";

function ScheduleContainer({ sites, onChange, style }) {
  const [selected, setSelected] = useState(null);

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
