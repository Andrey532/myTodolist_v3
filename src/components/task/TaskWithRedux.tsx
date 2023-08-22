import { TaskType } from "../Todolist";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CheckBox } from "../checbox/CheckBox"
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from "../editableSpan/EditableSpan"
import IconButton from "@material-ui/core/IconButton/IconButton";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../state/tasks-reducer";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = React.memo(({ task, todolistId }: TaskPropsType) => {
    const { id, title, isDone } = task

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(id, todolistId));

    const onChangeHandler = (tId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatusAC(tId, newIsDoneValue, todolistId));
    };

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId))
    }, [id]);
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