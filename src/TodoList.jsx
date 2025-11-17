import Form from "./Form";
import Items from "./Items";
import FilterStatus from "./FilterStatus";
import { useEffect, useState } from "react";

// Context
import { TodoContext } from "./Context/TodoContext";

export default function TodoList() {
  // State && Get Tasks from LocalStorage
  const [tasks, setTasks] = useState(() => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  return savedTasks ? savedTasks : [];
  });
  const [inputVlaue, setInputVlaue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Save Tasks in LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // handel Submit Task
  function handelSubmit(e) {
  e.preventDefault();

    // if (!inputVlaue)
    //   return alert("you must add a value");

    const taskList = {
      id: Date.now(),
      title: inputVlaue,
      completed: false,
    };

    // add tasks
    setTasks([...tasks, taskList]);
    setInputVlaue("");
  }

  //  Delete Task
  function handelDelete(idDel) {
    const updatedTasks = tasks.filter(task => task.id !== idDel);

    setTasks(updatedTasks);
  }

  // Check Task
  function toggleComplete(idCom) {
    const updatedTask = tasks.map((task) => {
      if (task.id === idCom) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTask);
  }

  // filtered Tasks 
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    else if(filterStatus === "completed") return task.completed;
    else if(filterStatus === "uncompleted") return !task.completed;
  });

  // filtered Tasks List
  function filteredTasksList() {
    return filteredTasks.length === 0 ? (
      <p style={{ textAlign: "center", marginTop: "15px", color: "gray", fontSize: "15px", }}>
        {filterStatus === "completed" ? "No Completed Tasks" : filterStatus === "uncompleted" ? "No UnCompleted Tasks" : "No Tasks yet"}
      </p> )
        : 
      ( <Items />);
  }

  return (
    <TodoContext.Provider value={{ 
        tasks, setTasks, inputVlaue, setInputVlaue,
        handelSubmit, handelDelete, toggleComplete,
        filteredTasks, filteredTasksList,
        filterStatus, setFilterStatus
      }}>
      <div className="todo-list">
        <h1> To Do List </h1>
        <Form />
        <FilterStatus /> 
        {filteredTasksList ()}
      </div>
    </TodoContext.Provider>
  );
}
