import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TaskForm from "../Forms/TaskForm";
import { updateProject } from "../slices/projectSlice";
const Project = () => {
  const { userid, projectid } = useParams();
  const dispatch = useDispatch();

  const projectDetails = useSelector((state) =>
    state.projects.projects.find(
      (project) => project.name === projectid && project.userId === userid
    )
  );

  const [project, setProjectState] = useState(projectDetails);
  const allUsers = useSelector((state) =>
    state.users.filter((user, i) => user.id !== userid)
  );

  const addTask = (task) => {
    setProjectState((prevState) => ({
      ...prevState,
      states: [...prevState.states].map((state, index) => {
        if (state.id === parseInt(task.state)) {
          return {
            ...state,
            tasks: [...state.tasks, task],
          };
        } else {
          return state;
        }
      }),
    }));
    dispatch(updateProject(project));
  };
  // const projectState = useSelector((state) => state.projects.projects.filter((project,i)=>)
  // console.log(project);
  return (
    <div style={{ textAlign: "center" }}>
      Project : {projectDetails.name} by User <b>{projectDetails.userId}</b>
      <TaskForm
        states={projectDetails.states}
        userId={userid}
        users={allUsers}
        addTask={addTask}
      />
    </div>
  );
};
export default Project;
