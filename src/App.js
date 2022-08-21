import logo from "./logo.svg";
import store from "./stores/taskStore.js";
import TaskList from "./slices/taskList";
import UserForm from "./Forms/UserForm";
import UserList from "./lists/UserList";
import { Outlet } from "react-router-dom";
import Dummy from "./lists/Dummy";
import { Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserForm />
        <UserList></UserList>
        <Outlet />
        {/* <TaskList></TaskList> */}
      </header>
    </div>
  );
}

export default App;
