import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice";
import selectedChannelReducer from "../slices/selectedChannelSlice";

const store = configureStore({
  reducer: {
    authState: userReducer,
    channelState: selectedChannelReducer,
  },
});

export default store;
