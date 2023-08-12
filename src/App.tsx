import "./App.css";
import { v1 } from "uuid";
import React, { useState } from "react";
import { TaskType, Todolist } from "./components/Todolist";

export type FilterValueType = "all" | "active" | "completed";

export const App = () => {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Redux-toolkit", isDone: false },
  ]);

  const removeTask = (taskId: string) =>
    setTasks(tasks.filter((el) => el.id !== taskId));

  const addTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    setTasks([...tasks, newTask])
  };
  return (
    <div className="App">
      <Todolist
        title={"What to learn"}
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
};
