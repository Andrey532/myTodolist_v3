import "./App.css";
import { useSelector }  from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskType, Todolist } from "./components/Todolist";
import { AddItemForm } from "./components/addItemForm/AddItemForm";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolists-reducer";
import { useDispatch } from "react-redux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export const AppWithRedux= () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const dispatch = useDispatch();

    const addTask = (title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId))

    const removeTask = (id: string, todolistId: string) => dispatch(removeTaskAC(id, todolistId))

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => dispatch(changeTaskTitleAC(id, newTitle, todolistId))

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => dispatch(changeTaskStatusAC(id, isDone, todolistId))

    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    };

    const removeTodolist = (id: string) => {
        let action = removeTodolistAC(id)
        dispatch(action)
    };

    const changeTodolistTitle = (id: string, title: string) => dispatch(changeTodolistTitleAC(id, title))

    const changeFilter = (value: FilterValuesType, todolistId: string) => dispatch(changeTodolistFilterAC(value, todolistId))

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
