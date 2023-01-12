import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReduser";
import { postsSlice } from "./posts/postsReduser";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [postsSlice.name]: postsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
