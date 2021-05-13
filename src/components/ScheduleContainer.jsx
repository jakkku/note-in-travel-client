import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import Schedule from "./shared/Schedule";
import { toggleSite } from "../reducers/favoriteSitesSlice";

function ScheduleContainer({ schedules, onChange, style }) {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  function handleIndexPress(schedule) {
    if (!selected) {
      setSelected(schedule);
      return;
    }

    if (selected.site.fullName !== schedule.site.fullName) {
      swapIndex(selected, schedule);
    }

    setSelected(null);
  }

  function handleLikePress(schedule) {
    dispatch(toggleSite(schedule));
  }

  function swapIndex(schedule1, schedule2) {
    [schedule1.index, schedule2.index] = [schedule2.index, schedule1.index];
    const newSchedules = schedules.slice().sort((a, b) => a.index - b.index);

    onChange(newSchedules);
  }

  return (
    <ScrollView style={{ ...styles.container, ...style }}>
      {schedules.map((schedule) => (
        <Schedule
          key={schedule.site.fullName}
          schedule={schedule}
          onIndexPress={handleIndexPress}
          onLikePress={handleLikePress}
          isSelected={selected && selected.site.fullName === schedule.site.fullName}
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
