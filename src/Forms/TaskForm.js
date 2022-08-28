import { React, useState } from "react";
import { useForm } from "react-hook-form";
const TaskForm = ({ userId, users }) => {
  const [assignee, setAssignee] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Enter task name"
          {...register("name", { required: true })}
        />
        <input type="hidden" name="assignedBy" value={userId}></input>

        <div>
          <select>
            <option disabled selected></option>
            {users.map((user, index) => {
              return (
                <option key={index} value={user.userId}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default TaskForm;
