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
const mock = [
  {
    isShared: false,
    messages: [],
    favorites: [],
    _id: "609be719df8a15356c131372",
    creator: "609be6e9df8a15356c13136f",
    sites: [
      {
        _id: "609be719df8a15356c131373",
        index: 1,
        site: "609be718df8a15356c131370",
      },
      {
        _id: "609be719df8a15356c131374",
        index: 2,
        site: "609be718df8a15356c131371",
      },
    ],
    createdAt: "2021-05-12T14:32:57.362Z",
    updatedAt: "2021-05-12T14:32:57.362Z",
    __v: 0,
  },
];

const initialState = {
  items: mock,
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
        state.error = action.error.message;
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
        state.error = action.error.message;
        state.status = "idle";
      }
    },
  },
});

export default myCoursesSlice.reducer;
