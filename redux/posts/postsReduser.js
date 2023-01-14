import { createSlice } from "@reduxjs/toolkit";
import { added, snepshitComment } from "./postsOptions";

const initialState = {
  posts: [],
  postsId: [],
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(added.fulfilled, (state, action) => {
      // console.log("action", action);
      if (!state.postsId.includes(action.payload.post.id)) {
        state.posts = [{ ...action.payload.post }, ...state.posts];
        state.postsId = [...state.postsId, action.payload.post.id];
      }
    });
    builder.addCase(added.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(snepshitComment.fulfilled, (state, action) => {
      // console.log("action", action);
      state.posts.forEach((post) => {
        if (post.id === action.payload.comment.postId) {
          let flag = true;
          post.comments.forEach((comment) => {
            if (comment.id === action.payload.comment.id) {
              flag = false;
            }
          });
          if (flag) {
            post.comments = [...post.comments, action.payload.comment];
          }
        }
      });
    });
    builder.addCase(snepshitComment.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
