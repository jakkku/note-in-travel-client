import { createSlice } from "@reduxjs/toolkit";

// TODO: delete this
const mock = [];

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
