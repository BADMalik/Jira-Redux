import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addProject } from "../slices/projectSlice";
import { Link } from "react-router-dom";
const ProjectList = () => {
  let dispatch = useDispatch();
  const userId = useParams();
  const userDetails = useSelector((state) =>
    state.users.find((user) => user.id === userId.userid)
  );
  const projects = useSelector((state) =>
    state.projects.projects.filter(
      (project) => project?.userId === userId.userid
    )
  );
  const [projectState, setProjectState] = useState({
    name: "",
    states: [{ id: 0, name: "", tasks: [] }],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let newProject = { userId: userDetails.id, ...projectState };
    dispatch(addProject(newProject));
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h1>Project List of {userDetails.name}</h1>
        <h3>{projects.length === 0 && "No Project Found for this user"}</h3>
        {projects.length > 0 &&
          projects.map((project) => {
            return (
              <div key={project.name}>
                <li>
                  <Link
                    to={`/user/${userId.userid}/project/${project.name}`}
                    key={userId.id}
                  >
                    {project.name}
                  </Link>
                </li>
              </div>
            );
          })}
      </div>
      <div style={{ marginTop: "5%", textAlign: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("projectName", { required: true })}
              onChange={(e) => {
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
          {projectState.states.map((value, index) => {
            return (
              <div key={index}>
                <div>
                  <input
                    value={projectState.states[index].name || ""}
                    onChange={(e) => {
                      setProjectState((prevState) => ({
                        ...prevState,
                        states: [...prevState.states].map((value, i) => {
                          if (index === value.id) {
                            return {
                              ...value,
                              name: e.target.value,
                            };
                          } else {
                            return value;
                          }
                        }),
                      }));
                    }}
                  />
                  <div>
                    {errors.name && <span>This field is required</span>}
                  </div>
                </div>
              </div>
            );
          })}
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
