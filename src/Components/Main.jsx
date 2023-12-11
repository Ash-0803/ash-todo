import FilterButton from "./FilterButton";
import Form from "./Form";
import TaskList from "./TaskList";
import { useContext, useState, useEffect } from "react";
import { DataContext, DispatchContext, FilterNamesContext } from "./../Context";

export default function Main() {
  const data = useContext(DataContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
    if (todos && todos.length) {
      console.log("Initializing data from local Storage...");
      dispatch({ type: "initialize_data", data: todos });
    } else {
      console.log("Initializing default data...");
      dispatch({
        type: "initialize_data",
        data: [
          { taskName: "Task 1", completed: true, id: "task-1" },
          { taskName: "Task 2", completed: false, id: "task-2" },
          { taskName: "Task 3", completed: false, id: "task-3" },
        ],
      });
    }
  }, []);

  useEffect(() => {
    console.log("setting to local storage data", data);
    localStorage.setItem("todos", JSON.stringify(data));
  }, [data]);

  const [filter, setFilter] = useState("All");
  const filterNames = useContext(FilterNamesContext);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form />

      <div className="filters btn-group stack-exception">
        {filterNames.map((type) => (
          <FilterButton
            key={type}
            type={type}
            isPressed={type === filter}
            setFilter={setFilter}
          />
        ))}
      </div>

      <h2 id="list-heading">{data.length} tasks remaining</h2>
      <TaskList filter={filter} />
    </div>
  );
}
