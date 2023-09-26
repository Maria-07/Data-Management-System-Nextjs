import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import { sideBarReducer } from "./features/sideBar/sideBarSlice";
import { patientDetailsReducer } from "./features/patient/patientSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    sideBarInfo: sideBarReducer,
    patientInfo: patientDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
