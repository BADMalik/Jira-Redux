import React from "react";
import { useSelector, useDispatch } from "react-redux";
import deleteUser from "../slices/userSlice";

const UserList = () => {
  const state = useSelector((state) => state.users);
  const dispatch = useDispatch();
  //   const del = (user) => {
  //     // console.log(user);
  //     dispatch(deleteUser(user));
  //   };
  return (
    <div>
      <ul>
        {state.length > 0 &&
          state.map((user) => {
            return (
              <li key={user.id}>
                {user.name}
                <button type="click" onClick={() => dispatch(deleteUser(user))}>
                  Delete user
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserList;
