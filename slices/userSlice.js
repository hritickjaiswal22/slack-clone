import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  userName: null,
  userEmail: null,
  uid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    saveUser(currentState, action) {
      currentState.userEmail = action.payload;
    },
    saveUserName(currentState, action) {
      currentState.userName = action.payload;
    },
    saveUserId(currentState, action) {
      currentState.uid = action.payload;
    },
  },
});

export const { saveUser, saveUserName, saveUserId } = userSlice.actions;

export default userSlice.reducer;
