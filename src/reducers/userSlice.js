import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

import fetchData from "../utils/fetchData";
// TODO: delete this
import MOCK from "../constants/mock";
import { initFavoriteCourses } from "./favoriteCoursesSlice";
import { initFavoriteSites } from "./favoriteSitesSlice";
import { initMyCourses } from "./myCoursesSlice";

export const loginUser = createAsyncThunk(
  "user/loginUserStatus",
  async (user, { dispatch }) => {
    await SecureStore.deleteItemAsync("token");
    const { token, user: userByFetch } = await fetchData("POST", "/auth/login", user);

    await SecureStore.setItemAsync("token", token);

    const { favoriteCourses, favoriteSites, myCourses } = userByFetch;

    dispatch(initFavoriteCourses(favoriteCourses));
    dispatch(initFavoriteSites(favoriteSites));
    dispatch(initMyCourses(myCourses));

    return userByFetch;
  },
);

const initialState = {
  value: MOCK.user,
  // value: null,
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [loginUser.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const {
          _id,
          email,
          name,
          photoUrl,
        } = action.payload;

        state.value = {
          _id,
          email,
          name,
          photoUrl,
        };
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

export default userSlice.reducer;

export const selectUserName = (state) => state.user.value.name;
export const selectPhotoUrl = (state) => state.user.value.photoUrl;
