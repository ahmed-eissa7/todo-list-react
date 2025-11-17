import FilterBtn from "./FilterBtn";

// Context
import { useContext } from "react";
import { TodoContext } from "./Context/TodoContext";

export default function FilterStatus() {
  const {tasks, filterStatus, setFilterStatus} = useContext(TodoContext);
  
  // Remaining Tasks
  const taskCompleted = tasks.filter(task => task.completed).length;
  const taskUnCompleted = tasks.filter(task => !task.completed).length;

  return (
    <div className="filter-btns">
      <FilterBtn name="All" count={(tasks.length)} onFilter={()=> setFilterStatus("all")} active={filterStatus === "all" ? "active" : ""} />

      <FilterBtn name="Completed" count={(taskCompleted)} onFilter={()=> setFilterStatus("completed")} active={filterStatus === "completed" ? "active" : ""} />

      <FilterBtn name="UnCompleted" count={(taskUnCompleted)} onFilter={()=> setFilterStatus("uncompleted")} active={filterStatus == "uncompleted" ? "active" : ""} />
    </div>
  )
}

