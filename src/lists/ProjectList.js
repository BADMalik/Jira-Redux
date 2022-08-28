import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addProject } from "../slices/projectSlice";
const ProjectList = () => {
  const userId = useParams();
  // console.log(userId);
  const userDetails = useSelector((state) =>
    state.users.find((user) => user.id === userId.userid)
  );
  const projects = useSelector((state) =>
    state.projects.projects.filter((project) => project?.userId === userId)
  );
  const [projectState, setProjectState] = useState({
    name: "",
    states: [{ id: 0, name: "", tasks: [] }],
  });
  console.log(userDetails, projects, projectState.states.length);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // data.preventDefault();
    console.log(data);
  };
  const updateState = (e) => {
    console.log(e.target.value);
  };
  console.log("PS", projectState);
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h1>Project List of current User</h1>
        <h3>{projects.length === 0 && "No Project Found for this user"}</h3>
      </div>
      <div style={{ marginTop: "5%", textAlign: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("projectName", { required: true })}
              onChange={(e) => {
                console.log(e.target.value);
                setProjectState((state) => ({
                  ...state,
                  name: e.target.value,
                }));
              }}
              name="projectName"
              value={projectState.name || ""}
              placeholder="Project Name"
            />
            {errors.projectName && <span>This field is required</span>}
          </div>
          {/* {projectState.states.map((value, index) => {
            console.log(index, value, value.name);
            let identifier = "name" + index;
            // return (
            //   <div key={index}>
            //     <div>
            //       <input
            //         value={projectState.states[index].name || ""}
            //         {...register(identifier, { required: true })}
            //         onChange={(e) => {
            //           console.log(e.target.value);
            //           setProjectState(
            //             [...[projectState.states]].map((value) => {
            //               if (index === value.id) {
            //                 return {
            //                   ...value,
            //                   name: e.target.value,
            //                 };
            //               } else {
            //                 return value;
            //               }
            //             })
            //           );
            //         }}
            //       />
            //       <div>
            //         {errors.name && <span>This field is required</span>}
            //       </div>
            //     </div>
            //   </div>
            // );
          })} */}
          <button
            onClick={() => {
              setProjectState((state) => ({
                ...state,
                states: [
                  ...state.states,
                  { id: projectState.states.length, name: "", tasks: [] },
                ],
              }));
            }}
            type="button"
          >
            Add
          </button>
          <button type="submit">Enter Project</button>
        </form>
      </div>
    </div>
  );
};
export default ProjectList;
