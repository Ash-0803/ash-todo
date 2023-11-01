import { useEffect, useState } from "react";
import "./App.css";
import FilterButton from "./Components/FilterButton";
import Form from "./Components/Form";
import TaskList from "./Components/TaskList";

function Main(props) {
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
    if (todos && todos.length) {
      console.log("Setting data from local Storage...");
      props.setData(todos);
    } else {
      console.log("Setting default data...");
      props.setData([
        { taskName: "Task 1", completed: true, id: "task-1" },
        { taskName: "Task 2", completed: false, id: "task-2" },
        { taskName: "Task 3", completed: false, id: "task-3" },
      ]);
    }
  }, []);

  useEffect(() => {
    console.log("data", props.data);
    localStorage.setItem("todos", JSON.stringify(props.data));
  }, [props.data]);

  const [filter, setFilter] = useState("All");
  const filterMap = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const filterNames = Object.keys(filterMap);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form {...props} />

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

      <h2 id="list-heading">{props.data.length} tasks remaining</h2>
      <TaskList {...props} filterMap={filterMap} filter={filter} />
    </div>
  );
}

export default function App() {
  const [data, setData] = useState([]);

  return (
    <main>
      <Main data={data} setData={setData} />
    </main>
  );
}
