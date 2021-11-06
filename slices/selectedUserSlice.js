import { createSlice } from "@reduxjs/toolkit";

const initialSelectedUserState = {
  selectedUserName: null,
  selectedUserId: null,
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState: initialSelectedUserState,
  reducers: {
    selectUser(currentState, action) {
      (currentState.selectedUserName = action.payload.userName),
        (currentState.selectedUserId = action.payload.id);
    },
  },
});

export const { selectUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
