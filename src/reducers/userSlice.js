import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

import fetchData from "../utils/fetchData";
// TODO: delete this
import MOCK from "../constants/mock";

export const loginUser = createAsyncThunk(
  "user/loginUserStatus",
  async (user) => {
    await SecureStore.deleteItemAsync("token");
    const response = await fetchData("POST", "/auth/login", user);

    await SecureStore.setItemAsync("token", response.token);

    return response.user;
  },
);

const initialState = {
  value: MOCK.user,
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
