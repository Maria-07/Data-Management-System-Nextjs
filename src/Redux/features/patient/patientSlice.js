import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//async action create=>thunk function (Patient Details)
const initialState = {
  loading: false,
  patientDetails: [],
  error: "",
};

export const getPatientsDetails = createAsyncThunk(
  "patients/getPatientsDetails",
  async ({ payload, token }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/patient/info`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token || null,
        },
      }
    );
    return response.data;
  }
);

const patientDetailsSlice = createSlice({
  name: "patients",
  initialState,

  reducers: {},
  //async action creator
  extraReducers: (builder) => {
    builder.addCase(getPatientsDetails.pending, (state) => {
      state.loading = true;
      state.error = {};
    });
    builder.addCase(getPatientsDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = {};
      state.patientDetails = action.payload;
    });
    builder.addCase(getPatientsDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.patientDetails = "";
    });
  },
});

export const patientDetailsReducer = patientDetailsSlice.reducer; //sliceName.reducer
