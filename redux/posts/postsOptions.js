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
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

export const added = createAsyncThunk("posts/Added", async (post, thunkAPI) => {
  try {
    // console.log(post);
    return post;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const snepshitComment = createAsyncThunk(
  "posts/SnepshitComment",
  async (comment, thunkAPI) => {
    try {
      // console.log(comment);
      return comment;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const getPostsData = async () => {
//   try {
//     console.log("1");
//     const dispatch = useDispatch();
//     console.log("2");
//     const db = getFirestore();
//     await onSnapshot(collection(db, "posts"), (snapshot) => {
//       snapshot.docChanges().map(async (change) => {
//         console.log(change.type);

//         test(change.doc.id);
//         // getComents(change.doc.id);
//         const post = {
//           id: change.doc.id,
//           ...change.doc.data(),
//           length: 0,
//           active: false,
//         };
//         if (change.type === "added") {
//           // console.log(data);
//           // setData((data) => [post, ...data]);
//           // console.log("addPost", post);
//           dispatch(added(post));
//         }
//         if (change.type === "modified") {
//           console.log("Modified city: ", change.doc.data());
//         }
//         if (change.type === "removed") {
//           console.log("Removed city: ", change.doc.data());
//         }
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     dispatch(added(error));
//   }
// };
