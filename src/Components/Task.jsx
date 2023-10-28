import { useState } from "react";

export default function Task({ taskName, completed, id, setData, data }) {
  const [isEditing, setEditing] = useState(false);
  const [editTaskName, setEditTaskName] = useState(taskName);

  function deleteTask(id) {
    const newData = data.filter((task) => task.id !== id);
    setData(newData);
  }

  function toggleTaskCompleted(e) {
    setData((prevData) =>
      prevData.map((task) => {
        if (e.target.id === task.id) {
          return { ...task, completed: e.target.checked };
        } else {
          return task;
        }
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setData((prevData) =>
      prevData.map((task) => {
        if (id === task.id) {
          return { ...task, taskName: editTaskName };
        } else return task;
      })
    );
    setEditing(false);
  }

  function handleChange(e) {
    setEditTaskName(e.target.value);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {taskName}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={editTaskName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {taskName}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new taskName for {taskName}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={toggleTaskCompleted}
        />
        <label className="todo-label" htmlFor={id}>
          {taskName}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{taskName}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete <span className="visually-hidden">{taskName}</span>
        </button>
      </div>
    </div>
  );

  return <>{isEditing ? editingTemplate : viewTemplate}</>;
}
