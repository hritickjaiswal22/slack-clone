import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    authState: userReducer,
  },
});

export default store;
