import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Task 1 ",
    status: "completed",
    assignedBy: "Bilal",
    assignedTo: "Malik",
  },
  {
    id: 2,
    title: "Task 2 ",
    status: "completed",
    assignedBy: "Talha",
    assignedTo: "Malik",
  },
];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    deleteTask(state, action) {
      // console.log(state, action);
      state.splice(action.payload.id - 1, 1);
    },
    addTask(state, action) {
      state.push(action.payload);
    },
  },
});

export const { deleteTask, addTask } = taskSlice.actions;
export default taskSlice.reducer;
