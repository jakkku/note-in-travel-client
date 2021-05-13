import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

import fetchData from "../utils/fetchData";

export const loginUser = createAsyncThunk(
  "user/loginUserStatus",
  async (user) => {
    const response = await fetchData("POST", "/auth/login", user);

    await SecureStore.setItemAsync("token", response.token);

    return response.user;
  },
);

// TODO: delete thiss
const mock = {
  _id: "609be6e9df8a15356c13136f",
  email: "test@test.com",
  name: "test",
  photoUrl: "https://lh3.googleusercontent.com/a/AATXAJzVxQACbbwpFSpdxU9IjpggSZFH483ZcYGk2PaO=s96-c",
};

const initialState = {
  value: mock,
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
