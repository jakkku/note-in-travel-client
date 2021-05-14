import { createSlice } from "@reduxjs/toolkit";

const initialState = "idle";

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    toggleMode: (state) => (state === "idle" ? "active" : "idle"),
  },
});

export const { toggleMode } = modeSlice.actions;

export default modeSlice.reducer;

export const selectMode = (state) => state.mode;
