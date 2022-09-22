import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./stores/taskStore";
import Dummy from "./lists/Dummy";
import ProjectList from "./lists/ProjectList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Project from "../src/page/Project";
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="nesteduser" element={<Dummy />}></Route>
          </Route>
          <Route path="user" element={<Dummy />}></Route>
          <Route path="user/:userid" element={<ProjectList />}></Route>
          <Route
            path="user/:userid/project/:projectid"
            element={<Project />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
