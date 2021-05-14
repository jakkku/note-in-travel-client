import { createSelector, createSlice } from "@reduxjs/toolkit";

import { loginUser } from "./userSlice";

// TODO: delete this
const mock = [];

const initialState = {
  items: [],
  error: null,
  status: "idle",
};

const favoriteSitesSlice = createSlice({
  name: "favoriteSites",
  initialState,
  reducers: {
    toggleSite: (state, action) => {
      const favoriteSites = state.items;
      const { fullName, shortName, region } = action.payload;
      const isFavorite = favoriteSites.find((favoriteSite) => favoriteSite.fullName === fullName);

      state.items = isFavorite
        ? favoriteSites.filter((favoriteSite) => favoriteSite.fullName !== fullName)
        : favoriteSites.concat({
          fullName,
          shortName,
          region,
        });
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [loginUser.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const { favoriteSites } = action.payload;

        state.items = favoriteSites;
        state.status = "idle";
      }
    },
    [loginUser.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.error = action.error.message;
        state.status = "idle";
      }
    },
  },
});

export const { toggleSite } = favoriteSitesSlice.actions;

export default favoriteSitesSlice.reducer;

export const selectFavoriteSites = (state) => state.favoriteSites.items;

export const selectFavoriteSiteBySiteFullName = createSelector(
  [selectFavoriteSites, (_, siteFullName) => siteFullName],
  (favoriteSites, siteFullName) => (
    favoriteSites.find((favoriteSite) => favoriteSite.fullName === siteFullName)
  ),
);
