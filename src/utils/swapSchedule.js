function swapSchedule(schedules, originIndex, destinationIndex) {
  function swapIndex(schedule) {
    if (schedule.index === originIndex) {
      return { index: destinationIndex, site: schedule.site };
    }

    if (schedule.index === destinationIndex) {
      return { index: originIndex, site: schedule.site };
    }

    return schedule;
  }

  return schedules.map(swapIndex).sort((a, b) => a.index - b.index);
}

export default swapSchedule;
