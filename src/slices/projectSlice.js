import { createSlice } from "@reduxjs/toolkit";

const initialState = { projects: [] };

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    updateProject(state, action) {
      return {
        ...state,
        projects: [...state.projects].map((project, index) => {
          if (project.name === action.payload.name) {
            return action.payload;
          } else {
            return project;
          }
        }),
      };
    },
  },
});
export const { addProject, updateProject } = projectSlice.actions;
export const ProjectReducer = projectSlice.reducer;
