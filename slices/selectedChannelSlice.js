import { createSlice } from "@reduxjs/toolkit";

const initialSelectedChannelState = {
  selectedChannel: null,
  selectedChannelId: null,
};

const selectedChannelSlice = createSlice({
  name: "selectedChannel",
  initialState: initialSelectedChannelState,
  reducers: {
    selectChannel(currentState, action) {
      currentState.selectedChannel = action.payload.channelName;
      currentState.selectedChannelId = action.payload.id;
    },
  },
});

export const { selectChannel } = selectedChannelSlice.actions;

export default selectedChannelSlice.reducer;
