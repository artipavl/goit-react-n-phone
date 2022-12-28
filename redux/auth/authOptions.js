import app from "../../firebase/config";
// console.log(app);
// import db from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const authSignInUser = createAsyncThunk(
  "auth/SignIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      return { email: user.email, name: user.phoneNumber, uid: user.uid };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignUpUser = createAsyncThunk(
  "auth/SignUp",
  async ({ email, password, name }, thunkAPI) => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      console.log(user);
      return { email: user.email, name: user.phoneNumber, uid: user.uid };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authStateChangeUser = createAsyncThunk(
  "auth/Change",
  async (prop, thunkAPI) => {
    try {
      return { ...prop };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const authStateSignOut = createAsyncThunk(
  "auth/SignOut",
  async (prop, thunkAPI) => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
