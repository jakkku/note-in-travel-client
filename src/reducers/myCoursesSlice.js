import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "../utils/fetchData";

import { loginUser } from "./userSlice";

export const saveMyCourse = createAsyncThunk(
  "myCourses/saveMyCourseStatus",
  async (course) => {
    const response = await fetchData("POST", "/course", course);

    return response;
  },
);

// TODO: delete this
const mock = [];

const initialState = {
  items: null,
  error: null,
  status: "idle",
};

const myCoursesSlice = createSlice({
  name: "myCourses",
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
        const { myCourses } = action.payload;

        state.items = myCourses;
        state.error = null;
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
        const newCourse = action.payload;

        state.items.push(newCourse);
        state.error = null;
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

export default myCoursesSlice.reducer;
