// Context
import { useContext } from "react";
import { TodoContext } from "./Context/TodoContext";

export default function Form() {
const { inputVlaue, handelSubmit, setInputVlaue } = useContext(TodoContext);

  return (
    <form onSubmit={handelSubmit}>
      <input value={inputVlaue} onChange={(e) => {setInputVlaue(e.target.value)}} type="text" placeholder="Enter a Task" />
      
      <button disabled={inputVlaue.length === 0}> Add </button>
    </form>
  )
}
