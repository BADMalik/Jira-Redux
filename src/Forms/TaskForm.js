import { React } from "react";
import { useForm } from "react-hook-form";
const TaskForm = ({ userId, users, states, addTask }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit(addTask)}>
        <input
          placeholder="Enter task name"
          {...register("name", { required: true })}
        />
        <input
          {...register("assignedBy", { required: true })}
          type="hidden"
          name="assignedBy"
          id="assignedBy"
          value={userId}
        ></input>

        <div>
          <select name="assignee" {...register("assignedTo")}>
            <option disabled></option>
            {users.map((user, index) => {
              return (
                <option key={index} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>
        {errors.assignedTo && <span>This field is required</span>}

        <div>
          <select name="state" {...register("state", { required: true })}>
            <option disabled></option>
            {states.map((states, index) => {
              return (
                <option key={index} value={parseInt(states.id)}>
                  {states.name}
                </option>
              );
            })}
          </select>
        </div>
        {errors.state && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default TaskForm;
