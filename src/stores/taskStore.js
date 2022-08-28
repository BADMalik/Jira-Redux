import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskReducer from "../slices/task";
import ProjectReducer from "../slices/projectSlice";
import { UserReducer } from "../slices/userSlice";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  users: UserReducer,
  tasks: taskReducer,
  projects: ProjectReducer,
});
// let allReducers = { tasks: taskReducer, users: userReducer };
const persistedReducer = persistReducer(persistConfig, rootReducer);
// export default () => {
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});
export const persistor = persistStore(store);
