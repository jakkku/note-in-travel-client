import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  error: null,
  status: "idle",
};

const favoriteSitesSlice = createSlice({
  name: "favoriteSites",
  initialState,
  reducers: {
    initFavoriteSites: (state, action) => {
      const favoriteSites = action.payload;

      state.items = favoriteSites;
    },
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
});

export const { initFavoriteSites, toggleSite } = favoriteSitesSlice.actions;

export default favoriteSitesSlice.reducer;

export const selectFavoriteSites = (state) => state.favoriteSites.items;

export const selectFavoriteSiteBySiteFullName = createSelector(
  [selectFavoriteSites, (_, siteFullName) => siteFullName],
  (favoriteSites, siteFullName) => (
    favoriteSites.find((favoriteSite) => favoriteSite.fullName === siteFullName)
  ),
);
