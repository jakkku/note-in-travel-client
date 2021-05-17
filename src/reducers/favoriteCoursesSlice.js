import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  error: null,
  status: "idle",
};

const favoriteCoursesSlice = createSlice({
  name: "favoriteCourses",
  initialState,
  reducers: {
    initFavoriteCourses: (state, action) => {
      const favoriteCourses = action.payload;

      state.items = favoriteCourses;
    },
  },
});

export const { initFavoriteCourses } = favoriteCoursesSlice.actions;

export default favoriteCoursesSlice.reducer;

export const selectFavoriteCourses = (state) => state.favoriteCourses.items;
