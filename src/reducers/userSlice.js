import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  error: null,
  status: "pending",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
