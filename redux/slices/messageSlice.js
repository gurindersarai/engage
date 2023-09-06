import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages:null,
  pagination:null,
  apiError:null,
  isLoading:false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setStart: (state) => {
      state.isLoading = true;
      state.apiError = null;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
      state.apiError = null;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;

    },
    appendMessage: (state, action) => {
      state.messages.push(...action.payload);
      state.isLoading = false;
      state.apiError = null;
    },
    prependMessage: (state, action) => {
      state.messages.unshift(...action.payload);
      state.isLoading = false;
      state.apiError = null;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.apiError = action.payload;
      state.apiError = null;
    },
  },
});

export const { setStart,setError,setPagination,setMessages,appendMessage,prependMessage } = messageSlice.actions;
export default messageSlice.reducer;
