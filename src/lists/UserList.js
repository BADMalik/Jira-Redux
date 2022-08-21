import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../slices/userSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const state = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const del = (user) => {
    dispatch(deleteUser(user));
  };
  return (
    <div>
      <ul>
        {state.length > 0 &&
          state.map((user) => {
            return (
              <li key={user.id}>
                {user.name}
                <button type="click" onClick={() => del(user)}>
                  Delete user
                </button>
                <Link to={`/user/${user.id}`} key={user.id}>
                  {user.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserList;
