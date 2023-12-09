import Task from "./Task";
import { filterMapContext } from "../Context";
import { useContext } from "react";

export default function TaskList(props) {
  const filterMap = useContext(filterMapContext);
  return (
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {props.data?.filter(filterMap[props.filter]).map((task) => (
        <li className="todo stack-small" key={task.id}>
          <Task
            taskName={task.taskName}
            completed={task.completed}
            id={task.id}
            {...props}
          />
        </li>
      ))}
    </ul>
  );
}
