import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
    deleteUser(state, action) {
      return state.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export const UserReducer = userSlice.reducer;
