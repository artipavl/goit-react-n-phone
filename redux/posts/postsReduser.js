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
      console.log("action", action);
      if (!state.postsId.includes(action.payload.post.id)) {
        state.posts = [{ ...action.payload.post }, ...state.posts];
        state.postsId = [...state.postsId, action.payload.post.id];
      }
    });
    builder.addCase(added.rejected, (state, action) => {});
    builder.addCase(snepshitComment.fulfilled, (state, action) => {
      console.log("action", action);
      state.posts.forEach((post) => {
        if (
          post.id === action.payload.comment.postId &&
          !post?.comments.includes(action.payload.comment)
        ) {
          post.comments = [...post.comments, action.payload.comment];
        }
      });
    });
    builder.addCase(snepshitComment.rejected, (state, action) => {});
  },
});
