import "./App.css";
import { v1 } from "uuid";
import { Reducer, useReducer } from "react";
import { TaskType, Todolist } from "./components/Todolist";
import { AddItemForm } from "./components/addItemForm/AddItemForm";
import { TasksReducerActionType, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";
import { TodolistsReducerACType, addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export const AppWithReducer = () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistType[], TodolistsReducerACType>>(todolistsReducer, [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ]);

    let [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, TasksReducerActionType>>(tasksReducer, {
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "React", isDone: true },
        ],
    });

    const addTask = (title: string, todolistId: string) => dispatchToTasks(addTaskAC(title, todolistId))

    const removeTask = (id: string, todolistId: string) => dispatchToTasks(removeTaskAC(id, todolistId))

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => dispatchToTasks(changeTaskTitleAC(id, newTitle, todolistId))

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))

    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    };

    const removeTodolist = (id: string) => {
        let action = removeTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    };

    const changeTodolistTitle = (id: string, title: string) => dispatchToTodolists(changeTodolistTitleAC(id, title))

    const changeFilter = (value: FilterValuesType, todolistId: string) => dispatchToTodolists(changeTodolistFilterAC(value, todolistId))

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id];
                let tasksForTodolist = allTodolistTasks;

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === true);
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                );
            })}
        </div>
    );
};
