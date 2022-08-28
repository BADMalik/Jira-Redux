import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addUser(state, action) {
      // ...state,
      // console.log(typeof state, action);
      // return (state) => {
      //   users: action.payload;
      // };
      state.push(action.payload);
      // console.log(state.users.name);
      // state.a.push(action.payload);
      // console.log(action);
      // state.push(action.payload);
      // return { ...state, users: state.users.concat(action.payload) };
      // return state.push(action.payload);
      // users : state.push(action.payload)
      return;
    },
    deleteUser(state, action) {
      return state.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export const UserReducer = userSlice.reducer;
