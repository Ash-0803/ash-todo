import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { filterMapContext, filterNamesContext } from "./Context";
import { Reducer } from "./Reducer";

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
  const filterNames = useContext(filterNamesContext);

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
      <TaskList {...props} filter={filter} />
    </div>
  );
}

export default function App() {
  const [data, dispatch] = useReducer(Reducer, []);
  const DataContext = createContext(null);
  const DispatchContext = createContext(null);

  const filterMap = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const filterNames = Object.keys(filterMap);

  return (
    <main>
      <DataContext.Provider value={data}>
        <DispatchContext.Provider value={dispatch}>
          <filterMapContext.Provider value={filterMap}>
            <filterNamesContext.Provider value={filterNames}>
              <Main data={data} setData={setData} />
            </filterNamesContext.Provider>
          </filterMapContext.Provider>
        </DispatchContext.Provider>
      </DataContext.Provider>
    </main>
  );
}
