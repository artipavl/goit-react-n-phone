import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reduser: {},
});
