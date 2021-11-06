import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  userName: null,
  userEmail: null,
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
  },
});

export const { saveUser, saveUserName } = userSlice.actions;

export default userSlice.reducer;
