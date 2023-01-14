import app, { storage } from "../../firebase/config";
// console.log(app);
import { auth } from "../../firebase/config";

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
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export const authSignInUser = createAsyncThunk(
  "auth/SignIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      return {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignUpUser = createAsyncThunk(
  "auth/SignUp",
  async ({ email, password, name, image }, thunkAPI) => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("image ", image);

      const response = await fetch(image);
      const file = await response.blob();
      const logoId = Date.now().toString();

      const storage = getStorage();
      const storageRef = await ref(storage, `userLogo/${user.uid}`);
      console.log("storageRef ", storageRef);

      const uploadBytesBd = await uploadBytes(storageRef, file);
      console.log("uploadBytesBd ", uploadBytesBd);

      const logoUrl = await getDownloadURL(storageRef);
      console.log("logoUrl ", logoUrl);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: logoUrl,
      });

      console.log("userCC", user);
      return {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      };
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
      // console.log(prop);
      // console.log(auth.currentUser);
      // const user = auth.currentUser;
      // console.log(user);
      console.log(prop);
      // if (user) {
      //   return {
      //     email: user.email,
      //     name: user.phoneNumber,
      //     uid: user.uid,
      //   };
      // }
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

export const authAddPhotoURL = createAsyncThunk(
  "auth/AddPhotoURL",
  async ({ image, uid }, thunkAPI) => {
    try {
      const auth = getAuth();

      const response = await fetch(image);
      const file = await response.blob();
      // const logoId = Date.now().toString();

      const storage = getStorage();
      const storageRef = await ref(storage, `userLogo/${uid}`);
      console.log("storageRef ", storageRef);

      const uploadBytesBd = await uploadBytes(storageRef, file);
      console.log("uploadBytesBd ", uploadBytesBd);

      const logoUrl = await getDownloadURL(storageRef);
      console.log("logoUrl ", logoUrl);

      await updateProfile(auth.currentUser, {
        photoURL: logoUrl,
      });

      return {
        photoURL: logoUrl,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

