import React from "react";

const UserForm = () => {
  const handleSubmit = (event) => {
    console.log(event);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Enter User Name : </p>
          <input type="text" id="username"></input>
        </div>
        <div>
          <button type="button">Enter User</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
