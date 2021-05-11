import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fetchData from "../utils/fetchData";

export const loginUser = createAsyncThunk(
  "user/loginUserStatus",
  async (user) => {
    const response = await fetchData("POST", "/auth/login", user);

    return response;
  },
);

export const saveMyCourse = createAsyncThunk(
  "usesr/saveMyCourseStatus",
  async (course) => {
    const response = await fetchData("POST", "/course", course);

    return response;
  },
);

const mock = {
  _id: "60979c06cc5d7c4100b81ba4",
  email: "a01081440011@gmail.com",
  favoriteCourses: [],
  favoriteSites: [],
  myCourses: [],
  name: "sungjin kim",
  photoUrl: "https://lh3.googleusercontent.com/a/AATXAJzVxQACbbwpFSpdxU9IjpggSZFH483ZcYGk2PaO=s96-c",
};

const initialState = {
  value: null,
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
        state.value = action.payload;
        state.status = "idle";
      }
    },
    [loginUser.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.error = action.payload.message;
        state.status = "idle";
      }
    },
    [saveMyCourse.pending]: (state) => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [saveMyCourse.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        state.value = action.payload;
        state.status = "idle";
      }
    },
    [saveMyCourse.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.error = action.payload.message;
        state.status = "idle";
      }
    },
  },
});

export default userSlice.reducer;

export const selectUserName = (state) => state.user.value.name;
export const selectPhotoUrl = (state) => state.user.value.photoUrl;
