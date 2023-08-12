import React, { useState } from "react";
import { filterType } from "../App";

type TodolistPropsType = {
  title: string;
  tasks: Task[];
  removeTask: (id: number) => void;
  // tasksFilter: (title: filterType) => void
};

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export const Todolist = (props: TodolistPropsType) => {

  let [filteredTasks, setFilteredTasks] = useState<filterType>("All");
    
  const tasksFilter = (title: filterType) => {
    setFilteredTasks(title);
  };

  const filterFn = () => {
    switch (filteredTasks) {
      case "Active": {
        return props.tasks.filter((el) => !el.isDone)
      }
      case "Completed": {
        return props.tasks.filter((el) => el.isDone)
      }
      default: return props.tasks
    }
}

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {filterFn().map((el) => {
          return (
            <li>
              <button onClick={()=>props.removeTask(el.id)}>x</button>
              <input type="checkbox" checked={el.isDone} /><span>{el.title}</span>
            </li>)})}
      </ul>
      <div>
        <button onClick={()=>tasksFilter("All")}>All</button>
        <button onClick={()=>tasksFilter("Active")}>Active</button>
        <button onClick={()=>tasksFilter("Completed")}>Completed</button>
      </div>
    </div>
  );
};
