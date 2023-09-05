import { configureStore,applyMiddleware,createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import websocketReducer  from '../slices/websocketSlice';
import messageReducer  from '../slices/messageSlice';
import thunk from "redux-thunk";

const middleware = [
  createSerializableStateInvariantMiddleware({
    isSerializable: (value) => true,
  }),
  thunk,

];
// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({
    reducer: {
      auth: authReducer,
      websocket: websocketReducer,
      message: messageReducer,
    },
    middleware,
  });
export default store;
