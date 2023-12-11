import { createContext, useReducer } from "react";
import "./App.css";
import Main from "./Components/Main";
import {
  FilterMapContext,
  FilterNamesContext,
  DataContext,
  DispatchContext,
} from "./Context";
import { Reducer } from "./Reducer";

export default function App() {
  const [data, dispatch] = useReducer(Reducer, []);

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
          <FilterMapContext.Provider value={filterMap}>
            <FilterNamesContext.Provider value={filterNames}>
              <Main />
            </FilterNamesContext.Provider>
          </FilterMapContext.Provider>
        </DispatchContext.Provider>
      </DataContext.Provider>
    </main>
  );
}
