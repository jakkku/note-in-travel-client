import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import Schedule from "./Schedule";

function ScheduleContainer({ sites, style }) {
  return (
    <ScrollView style={{ ...styles.container, ...style }}>
      {sites.map((site, index) => (
        <Schedule
          key={site.fullName}
          index={index + 1}
          site={site}
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
