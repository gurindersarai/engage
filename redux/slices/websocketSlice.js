import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ws: null,
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setWebSocket: (state, action) => {
      state.ws = action.payload;
    },
  },
});

export const { setWebSocket } = websocketSlice.actions;
export default websocketSlice.reducer;
