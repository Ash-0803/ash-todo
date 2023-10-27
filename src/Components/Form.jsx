import {useState} from 'react'

export default function Form(props){
  const [name,setName]=useState('name')

  const addTask = (value) => {
    props.setData(prevData=>[...prevData,{taskName:value,completed:false}])
      alert(value,"is added to the list")
    console.log(props.data)
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    let count=0
    props.data.forEach((item)=>{
      if(item.taskName===name){
        alert("Task already exists!")
        count=1
      }
    })
    if(count==0){
    // props.addTask(e.target.elements.text.value)
      addTask(e.target.elements.text.value)
    }
  }
  const handleChange=(e)=>{
    setName(e.target.value)
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg" >
        Add
      </button>
    </form>
  )
}