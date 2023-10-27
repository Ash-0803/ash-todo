import Task from './Task'

export default function TaskList(props){
  return(
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading">
      {props.data?.map((singleTask,index)=>(
     
        <li className="todo stack-small" key={index}>
          <Task taskName={singleTask.taskName} completed={singleTask.completed} id={index} {...props}/>
        </li>
     
    ))}
       </ul>
  )
}