import { FilterValuesType } from "../App";
import { CheckBox } from "./checbox/CheckBox"
import DeleteIcon from '@mui/icons-material/Delete';
import { AddItemForm } from "./addItemForm/AddItemForm";
import { EditableSpan } from "./editableSpan/EditableSpan";
import IconButton from "@material-ui/core/IconButton/IconButton";

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

export const Todolist = (props: PropsType) => {
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  const onChangeHandler = (tId: string, newIsDoneValue: boolean) => {
    props.changeTaskStatus(tId, newIsDoneValue, props.id);
  };

  return <div>
      <h3>
        <EditableSpan oldTitle={props.title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon />
                </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.id);
          
          const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <CheckBox checked={t.isDone} onChangeStatus={(newIsDoneValue)=>onChangeHandler(t.id, newIsDoneValue)}/>
              <EditableSpan
                oldTitle={t.title}
                onChange={onTitleChangeHandler}/>
              <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteIcon />
                </IconButton>
            </div>
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
};
