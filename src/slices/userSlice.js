import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
    deleteUser(state, action) {
      state.splice(action.payload.id, 1);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
