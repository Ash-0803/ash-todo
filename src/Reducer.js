import { nanoid } from "nanoid";

export function Reducer(state, action) {
  console.log("Reducer action:", action.data);
  switch (action.type) {
    case "initialize_data": {
      console.log("initialize", action.data);
      return action.data;
    }
    case "add_task": {
      return (state) => [
        ...state,
        { taskName: action.value, completed: false, id: `todo-${nanoid()}` },
      ];
    }
    case "delete_task": {
      return state.filter((task) => task.id !== action.id);
    }
    case "toggle_task_completed": {
      return (state) =>
        state.map((task) => {
          if (action.id === task.id) {
            return { ...task, completed: action.checked };
          } else {
            return task;
          }
        });
    }
    case "handle_submit": {
      return (state) =>
        state.map((task) => {
          if (action.id === task.id) {
            return { ...task, taskName: action.editTaskName };
          } else return task;
        });
    }
  }
}
