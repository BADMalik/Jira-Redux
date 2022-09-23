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
  const reduxState = useSelector((state) => {
    return state;
  });
  // console.log(reduxState, "REDUX");
  // console.log(projectDetails, "intial value project detials");

  const [project, setProjectState] = useState(projectDetails);
  const [redux, setRedux] = useState(reduxState);
  const allUsers = useSelector((state) =>
    state.users.filter((user, i) => user.id !== userid)
  );

  const addTask = (task) => {
    let data;
    // let count = 0;
    task.id = getRandomInt(100000000);
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
    dispatch(updateProject(data));
    setRedux(data);
  };

  const onDragEnd = useCallback((result) => {
    let exit = false;
    let newSourceProjectobject = { ...projectDetails };
    // console.log(redux, "REDUX on drag");
    let replace;
    const { destination, source } = result;
    console.log(result, "Draggable result");
    if (source?.index === destination?.index) {
      return;
    }
    console.log(source, destination, "coordinates");
    let nullIndex;
    //find the source task
    for (let i = 0; i < newSourceProjectobject.states.length; i++) {
      for (let j = 0; j < newSourceProjectobject.states[i].tasks.length; j++) {
        if (source.index === newSourceProjectobject.states[i].tasks[j].id) {
          nullIndex = i;
          replace = { ...newSourceProjectobject };
          console.log(
            replace,
            newSourceProjectobject.states[i].tasks,
            j,
            "found"
          );
          if (newSourceProjectobject.states[i].tasks.length === 1) {
            console.log(replace?.states[i]?.tasks);
            replace = replace?.states[i]?.tasks.shift();
          } else {
            replace = { ...replace };
            let tempObj = { ...replace };
            //if there are multiple elements in the source
            replace = tempObj?.states[i]?.tasks.splice(j, 1)[0];
          }
          break;
        }
      }
    }
    if (nullIndex !== undefined) {
      for (let i = 0; i < newSourceProjectobject.states.length; i++) {
        if (exit) {
          break;
        }
        for (
          let j = 0;
          j < newSourceProjectobject.states[i].tasks.length;
          j++
        ) {
          //best case that if the destination is found
          if (
            destination.index === newSourceProjectobject.states[i].tasks[j].id
          ) {
            newSourceProjectobject.states[i].tasks.push(replace);
            exit = true;
            break;
          }
          //use case that the destination is empty so it's index will be 0
          else if (destination.index === 0 && destination.droppableId) {
            newSourceProjectobject.states[
              parseInt(destination.droppableId)
            ].tasks.push(replace);
            exit = true;
            break;
            // console.log(replace);
          }
        }
      }
    }
    // console.log(newSourceProjectobject.states, "FPCCCCCCCCCCCCC");
    dispatch(updateProject(newSourceProjectobject));
    // setRedux(finalProjectCopy);
    // console.table(newSourceProjectobject, "Final Source Project Version");
  }, []);
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
