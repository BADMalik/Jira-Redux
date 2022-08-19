import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "../slices/task";
import userReducer from "../slices/userSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
  },
});
