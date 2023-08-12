import { Button } from "./Button";
import { FilterValueType } from "../App";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  addTask: (title: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const Todolist = (props: TodolistPropsType) => {
  let [filteredTasks, setFilteredTasks] = useState<FilterValueType>("all");
  let [title, setTitle] = useState<string>("");

  const tasksFilter = (title: FilterValueType) => {
    setFilteredTasks(title);
  };

  const filterFn = () => {
    switch (filteredTasks) {
      case "active": {
        return props.tasks.filter((el) => !el.isDone);
      }
      case "completed": {
        return props.tasks.filter((el) => el.isDone);
      }
      default:
        return props.tasks;
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputHandler();
    }
  };

  const addTaskHandler = () => {
    inputHandler();
  };

  const inputHandler = () => {
    props.addTask(title);
    setTitle("");
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <Button name={"+"} callback={addTaskHandler}/>
      </div>
      <ul>
        {filterFn().map((el) => {
          const removeTaskHandler = () => {
            props.removeTask(el.id);
          };
          return (
            <li key={el.id}>
              <Button name={"X"} callback={removeTaskHandler}/>
              <input type="checkbox" checked={el.isDone} />
              <span>{el.title}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <Button name={"All"} callback={() => tasksFilter("all")}/>
        <Button name={"Active"} callback={() => tasksFilter("active")}/>
        <Button name={"Completed"} callback={() => tasksFilter("completed")}/>
      </div>
    </div>
  );
};
