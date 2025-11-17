import Item from "./Item";

// Context
import { useContext } from "react";
import { TodoContext } from "./Context/TodoContext";

export default function Items() {
  const { filteredTasks } = useContext(TodoContext);

  return (
      <ul>
        {filteredTasks.map(task => (
          <Item key={task.id} task={task} />
        ))}
      </ul>
  );
}
