import Task from "./Task";

export default function TaskList(props) {
  return (
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {props.data?.filter(props.filterMap[props.filter]).map((task) => (
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
