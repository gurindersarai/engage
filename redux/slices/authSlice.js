// authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    isLoading: false, // Add a loading state
    apiError: null, // Add an apiError state
    token: null,
  },
  reducers: {
    authStart: (state) => {
      state.isLoading = true;
      state.apiError = null;
    },
    authSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
      state.apiError = null;
    },
    authFailure: (state, action) => {
      state.isLoading = false;
      state.apiError = action.payload;
    },
    authLogout: (state) => {
      console.log('lotSLice');
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.apiError = null;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  authLogout,
} = authSlice.actions;

export default authSlice.reducer;
// const initialState = {
//     user: null,
//     isAuthenticated: false,
//     token: false,
//     error: null,
//   };
  
//   const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'LOGIN_SUCCESS':
//       case 'REGISTER_SUCCESS':
//       case 'SET_AUTH':
//         return {
//           ...state,
//           user: action.payload,
//           isAuthenticated: true,
//           error: null,
//         };
//       case 'LOGIN_FAILURE':
//       case 'REGISTER_FAILURE':
//         return {
//           ...state,
//           user: null,
//           isAuthenticated: false,
//           error: action.payload,
//         };
//       case 'LOGOUT':
//         return {
//           ...state,
//           user: null,
//           error: null,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default authReducer;
  