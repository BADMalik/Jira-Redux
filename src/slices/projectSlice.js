import { createSlice } from "@reduxjs/toolkit";

const initialState = { projects: [] };

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action) {
      state.push(action.payload);
    },
  },
});
export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;
