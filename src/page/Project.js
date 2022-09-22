import { React, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TaskForm from "../Forms/TaskForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateProject } from "../slices/projectSlice";
const Project = () => {
  const { userid, projectid } = useParams();
  const dispatch = useDispatch();
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
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
    let data;
    // let count = 0;
    task.id = getRandomInt(100000000);
    // for (let i = 0; i < projectDetails.states.length; i++) {
    //   count = count + projectDetails.states[i].tasks.length;
    // }
    // count += 1;
    // task.id = count;
    // console.log(task);
    // return 0;
    setProjectState((prevState) => {
      data = {
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
      };
      return data;
    });
    // console.log(data);
    dispatch(updateProject(data));
  };

  const onDragEnd = useCallback((result) => {
    let newSourceProjectobject = projectDetails;
    let replace;
    const { destination, source } = result;
    console.log(result);
    let finalProjectCopy;
    // if (destination.index === 0 && )
    if (source.index === destination?.index) {
      return;
    }
    let nullIndex;
    for (let i = 0; i < newSourceProjectobject.states.length; i++) {
      for (let j = 0; j < newSourceProjectobject.states[i].tasks.length; j++) {
        console.log(
          "newSourceProjectobject.states[i]",
          newSourceProjectobject.states[i]
        );
        if (source.index === newSourceProjectobject.states[i].tasks[j].id) {
          nullIndex = i;
          replace = JSON.parse(
            JSON.stringify(newSourceProjectobject.states[i].tasks.splice(j, 1))
          );
        }
      }
    }

    for (let i = 0; i < newSourceProjectobject.states.length; i++) {
      if (
        newSourceProjectobject.states[i].tasks.length === 0 &&
        nullIndex === i
      ) {
        continue;
      }
      if (
        newSourceProjectobject.states[i].tasks.length === 0 &&
        nullIndex !== i
      ) {
        if (destination.index === 0) {
          let newTaskList = [];
          let latestReplacement = {
            ...replace[0],
            state: newSourceProjectobject.states[i].id.toString(),
          };
          newTaskList.push(latestReplacement);
          finalProjectCopy = JSON.parse(JSON.stringify(newSourceProjectobject));
          finalProjectCopy.states[i].tasks = newTaskList;
          break;
        }
      } else {
        for (
          let j = 0;
          j < newSourceProjectobject.states[i].tasks.length;
          j++
        ) {
          if (
            destination.index === newSourceProjectobject.states[i].tasks[j].id
          ) {
            let newTaskList = JSON.parse(
              JSON.stringify(newSourceProjectobject.states[i].tasks)
            );

            let latestReplacement = {
              ...replace[0],
              state: newSourceProjectobject.states[i].tasks[j].state,
            };
            newTaskList.splice(j, 0, latestReplacement);
            finalProjectCopy = JSON.parse(
              JSON.stringify(newSourceProjectobject)
            );
            finalProjectCopy.states[i].tasks = newTaskList;
          }
          if (
            destination.index ===
            newSourceProjectobject.states[i].tasks[j].id + 1
          ) {
            let newTaskList = JSON.parse(
              JSON.stringify(newSourceProjectobject.states[i].tasks)
            );
            let latestReplacement = {
              ...replace[0],
              state: newSourceProjectobject.states[i].tasks[j].state,
            };
            newTaskList.splice(j + 1, 0, latestReplacement);
            finalProjectCopy = JSON.parse(
              JSON.stringify(newSourceProjectobject)
            );
            finalProjectCopy.states[i].tasks = newTaskList;
          }
        }
      }
    }
    console.log(finalProjectCopy, "FPCCCCCCCCCCCCC");

    // console.log(finalProjectCopy, "|||||||");
    dispatch(updateProject(finalProjectCopy));
    // setProjectState(finalProjectCopy);
  }, []);
  // console.log("updated proejct state", project);
  return (
    <div style={{ textAlign: "center" }}>
      Project : {projectDetails.name} by User <b>{projectDetails.userId}</b>
      <TaskForm
        states={projectDetails.states}
        userId={userid}
        users={allUsers}
        addTask={addTask}
      />
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {projectDetails.states.map((state, index) => {
              return (
                <div key={index} style={{ border: "1px solid grey" }}>
                  <div key={state.id}>{state.name}</div>
                  <Droppable droppableId={state.id.toString()} key={state.name}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ padding: "0px 40px" }}
                        key={state.name}
                      >
                        {state.tasks.length > 0 &&
                          state.tasks.map((task, taskIndex) => {
                            // console.log("task", task, "taskindex", taskIndex);
                            return (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={task.id}
                              >
                                {(provided) => (
                                  <div
                                    style={{
                                      border: "1px solid grey",
                                      padding: "0px 40px",
                                      margin: "2px",
                                    }}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    index={task.id}
                                    key={task.id}
                                  >
                                    {task.name}
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
            {/* </div> */}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};
export default Project;
