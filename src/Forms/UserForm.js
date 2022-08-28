import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import uuid from "react-uuid";

const UserForm = () => {
  let state = useSelector((state) => state.users);
  // console.log(state);
  let dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      id: uuid(),
      name: event.target.username.value,
    };
    // let { username } = event.target.elements;
    // console.log(data);
    dispatch(addUser(data));
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
