import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
    deleteUser(state, action) {
      console.log(action);
      // return {
      //   ...state,
      //   users: state.users.filter((user) => user.id !== action.payload.id),
      // };
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
