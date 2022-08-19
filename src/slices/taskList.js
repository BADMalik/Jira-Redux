import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTask } from "./task";
const TaskList = () => {
  const state = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  return (
    <div>
      {state.map((task) => {
        return (
          <div key={task.id}>
            {task.title}
            <div>
              <button onClick={() => dispatch(deleteTask(task))}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
