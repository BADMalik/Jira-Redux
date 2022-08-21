import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
const ProjectList = () => {
  const userId = useParams();
  console.log(userId);
  const userDetails = useSelector((state) =>
    state.users.find((user) => user.id === userId.userId)
  );
  console.log(userDetails);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("projectName", { required: true })} />
          {errors.projectName && <span>This field is required</span>}
        </div>
      </form>
    </div>
  );
};
export default ProjectList;
