import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import { sideBarReducer } from "./features/sideBar/sideBarSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    sideBarInfo: sideBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
