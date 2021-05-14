import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import Schedule from "./Schedule";

import { toggleSite } from "../reducers/favoriteSitesSlice";
import swapSchedule from "../utils/swapSchedule";

function ScheduleList({ schedules, onChange, style }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();

  function handleIndexPress(scheduleIndex) {
    if (!onChange) return;

    if (!selectedIndex) {
      setSelectedIndex(scheduleIndex);
      return;
    }

    if (selectedIndex !== scheduleIndex) {
      onChange(swapSchedule(schedules, selectedIndex, scheduleIndex));
    }

    setSelectedIndex(null);
  }

  function handleLikePress(site) {
    dispatch(toggleSite(site));
  }

  return (
    <ScrollView style={[styles.container, style]}>
      {schedules.map((schedule) => (
        <Schedule
          key={schedule.site.fullName}
          schedule={schedule}
          onIndexPress={handleIndexPress}
          onLikePress={handleLikePress}
          accent={selectedIndex && selectedIndex === schedule.index}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    paddingHorizontal: "5%",
    width: "100%",
  },
});

export default ScheduleList;
