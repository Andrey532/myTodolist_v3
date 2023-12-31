import React from "react";
import { useCallback } from "react";
import { FilterValuesType } from "../App";
import { CheckBox } from "./checbox/CheckBox"
import DeleteIcon from '@mui/icons-material/Delete';
import { AddItemForm } from "./addItemForm/AddItemForm";
import { EditableSpan } from "./editableSpan/EditableSpan";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { Task } from "./task/Task";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
    filter: FilterValuesType;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
};

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])

    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean) => {
        props.changeTaskStatus(taskId, newIsDone, props.id)
    }, [props.changeTaskStatus, props.id])

    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    }, [props.changeTaskTitle, props.id])

    let tasks = props.tasks;

    if (props.filter === "active") {
        tasks = tasks.filter((t) => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter((t) => t.isDone === true);
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} onChange={changeTodolistTitle} />
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        {tasks.map((t) => {
            return <Task key={t.id}
                task={t}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle} />
        })}
        <div>
            <button
                className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}
            >All</button>

            <button
                className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}
            >Active</button>

            <button
                className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}
            >Completed</button>
        </div>
    </div>
})
