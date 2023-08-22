import React from "react";
import { TaskType } from "../Todolist";
import { CheckBox } from "../checbox/CheckBox"
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from "../editableSpan/EditableSpan"
import IconButton from "@material-ui/core/IconButton/IconButton";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void;
    changeTaskStatus: (id: string, isDone: boolean) => void;
    changeTaskTitle: (taskId: string, newTitle: string) => void;
}

export const Task = React.memo (({ task, removeTask, changeTaskStatus, changeTaskTitle }: TaskPropsType) => {
    const { id, title, isDone } = task

    const onClickHandler = () => removeTask(id);

    const onChangeHandler = (tId: string, newIsDoneValue: boolean) => {
        changeTaskStatus(tId, newIsDoneValue);
    };

    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(id, newValue);
    };
    return (
        <div key={id} className={isDone ? "is-done" : ""}>
            <CheckBox checked={isDone} onChangeStatus={(newIsDoneValue) => onChangeHandler(id, newIsDoneValue)} />
            <EditableSpan
                oldTitle={title}
                onChange={onTitleChangeHandler} />
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteIcon />
            </IconButton>
        </div>)
})