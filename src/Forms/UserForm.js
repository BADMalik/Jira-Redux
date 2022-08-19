import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import uuid from "react-uuid";

const UserForm = () => {
  let state = useSelector((state) => state.users);
  let dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    let { username } = event.target.elements;
    dispatch(
      addUser({
        id: uuid(),
        name: username.value,
      })
    );
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Enter User Name : </p>
          <input type="text" id="username"></input>
        </div>
        <div>
          <button type="submit">Enter User</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
