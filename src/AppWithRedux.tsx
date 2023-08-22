import "./App.css";
import { AppRootStateType } from "./state/store";
import { useSelector, useDispatch } from "react-redux";
import { TaskType, Todolist } from "./components/Todolist";
import { AddItemForm } from "./components/addItemForm/AddItemForm";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolists-reducer";
import { useCallback } from "react";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const dispatch = useDispatch();

    const addTask = useCallback((title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId)), [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => dispatch(removeTaskAC(id, todolistId)), [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => dispatch(changeTaskTitleAC(id, newTitle, todolistId)), [dispatch])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => dispatch(changeTaskStatusAC(id, isDone, todolistId)), [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch]);

    const removeTodolist = useCallback((id: string) => {
        let action = removeTodolistAC(id)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => dispatch(changeTodolistTitleAC(id, title)), [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => dispatch(changeTodolistFilterAC(value, todolistId)), [dispatch])

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolists.map(tl => {
               

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
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
