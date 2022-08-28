import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TaskForm from "../Forms/TaskForm";
const Project = () => {
  const { userid, projectid } = useParams();
  const allUsers = useSelector((state) =>
    state.users.filter((user, i) => user.id !== userid)
  );

  const projectDetails = useSelector((state) =>
    state.projects.projects.find(
      (project) => project.name === projectid && project.userId === userid
    )
  );
  return (
    <div style={{ textAlign: "center" }}>
      Project : {projectDetails.name} by User <b>{projectDetails.userId}</b>
      <TaskForm userId={userid} users={allUsers} />
    </div>
  );
};

export default Project;
