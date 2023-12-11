import Task from "./Task";
import { FilterMapContext, DataContext } from "../Context";
import { useContext } from "react";

export default function TaskList(props) {
  const filterMap = useContext(FilterMapContext);
  const data = useContext(DataContext);
  console.log("TaskLIst data: " + data[0]);
  return (
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {data.filter(filterMap[props.filter]).map((task) => (
        <li className="todo stack-small" key={task.id}>
          <Task
            taskName={task.taskName}
            completed={task.completed}
            id={task.id}
          />
        </li>
      ))}
    </ul>
  );
}
