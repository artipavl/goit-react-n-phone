import { createSlice } from "@reduxjs/toolkit";
import {
  authAddPhotoURL,
  authSignInUser,
  authSignUpUser,
  authStateChangeUser,
  authStateSignOut,
} from "./authOptions";

const initialState = {
  uid: null,
  userName: null,
  email: null,
  photoURL: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authSignInUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.name;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
      state.isLoggedIn = true;
    });
    builder.addCase(authSignInUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    });

    builder.addCase(authSignUpUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.name;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
      state.isLoggedIn = true;
    });
    builder.addCase(authSignUpUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    });

    builder.addCase(authStateChangeUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.name;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
      state.isLoggedIn = true;
    });
    
    builder.addCase(authStateChangeUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    });

    builder.addCase(authAddPhotoURL.fulfilled, (state, action) => {
      state.photoURL = action.payload.photoURL;
    });

    builder.addCase(authAddPhotoURL.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(authStateSignOut.fulfilled, (state, action) => ({
      ...initialState,
    }));
  },
  //   extraReducers: {
  //     [authSignInUser.fulfilled](state, action) {
  //       state.email = action.payload.email;
  //       state.userName = action.payload.name;
  //       state.uid = action.payload.uid;
  //       state.isLoggedIn = true;
  //     },
  //     [authSignInUser.rejected](state, action) {
  //       state.error = action.payload;
  //       state.isLoggedIn = false;
  //     },

  //     [authSignUpUser.fulfilled](state, action) {
  //       state.email = action.payload.email;
  //       state.userName = action.payload.name;
  //       state.uid = action.payload.uid;
  //       state.isLoggedIn = true;
  //     },
  //     [authSignUpUser.rejected](state, action) {
  //       state.error = action.payload;
  //       state.isLoggedIn = false;
  //     },

  //     [authStateChangeUser.fulfilled](state, action) {
  //       state.email = action.payload.email;
  //       state.userName = action.payload.name;
  //       state.uid = action.payload.uid;
  //       state.isLoggedIn = true;
  //     },
  //     [authStateChangeUser.rejected](state, action) {
  //       state.error = action.payload;
  //       state.isLoggedIn = false;
  //     },
  //   },
});
