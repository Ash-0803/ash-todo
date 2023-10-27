import './App.css'
import { useEffect, useState } from "react"
import TaskList from './Components/TaskList'
import Form from './Components/Form'
import FilterButton from './Components/FilterButton'

function Main(props){
  return(
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form {...props}/>

      <div className="filters btn-group stack-exception">
        <FilterButton type="All" />
        <FilterButton type="Active" />
        <FilterButton type="Completed" />
      </div>

      <h2 id="list-heading">{props.data.length} tasks remaining</h2>
      <TaskList {...props} />
    </div>
  )
}


export default function App() {

  const initialData = [
    { taskName: "Task 1", completed: true },
    { taskName: "Task 2", completed: false },
    { taskName: "Task 3", completed: false },
];

  const [ data, setData ] = useState(initialData)
  
  return (  
    <main>
      <Main  data={data}  setData={setData} />
    </main>
  )
}

