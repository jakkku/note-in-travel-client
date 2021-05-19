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
      const site = action.payload;
      const isBookmarked = favoriteSites.find((favoriteSite) => favoriteSite._id === site._id);

      state.items = isBookmarked
        ? favoriteSites.filter((favoriteSite) => favoriteSite._id !== site._id)
        : favoriteSites.concat(site);
    },
  },
});

export const { initFavoriteSites, toggleSite } = favoriteSitesSlice.actions;

export default favoriteSitesSlice.reducer;

export const selectFavoriteSites = (state) => state.favoriteSites.items;

export const selectFavoriteSiteBySiteId = createSelector(
  [selectFavoriteSites, (_, siteId) => siteId],
  (favoriteSites, siteId) => (
    favoriteSites.find((favoriteSite) => favoriteSite._id === siteId)
  ),
);
