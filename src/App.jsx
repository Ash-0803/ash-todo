import { useState } from "react";
import "./App.css";
import FilterButton from "./Components/FilterButton";
import Form from "./Components/Form";
import TaskList from "./Components/TaskList";

function Main(props) {
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
  const initialData = [
    { taskName: "Task 1", completed: true, id: "task-1" },
    { taskName: "Task 2", completed: false, id: "task-2" },
    { taskName: "Task 3", completed: false, id: "task-3" },
  ];

  const [data, setData] = useState(initialData);

  return (
    <main>
      <Main data={data} setData={setData} />
    </main>
  );
}
