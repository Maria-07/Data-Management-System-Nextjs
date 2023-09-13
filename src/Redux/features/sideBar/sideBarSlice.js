import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    handleSidebarFixed: (state) => !state,
  },
});

// Action creators are generated for each case reducer function
export const { handleSidebarFixed } = sideBarSlice.actions;

export const sideBarReducer = sideBarSlice.reducer; //sliceName.reducer
