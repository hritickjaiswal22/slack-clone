import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice";
import selectedChannelReducer from "../slices/selectedChannelSlice";
import selectedUserReducer from "../slices/selectedUserSlice";

const store = configureStore({
  reducer: {
    authState: userReducer,
    channelState: selectedChannelReducer,
    usersState: selectedUserReducer,
  },
});

export default store;
