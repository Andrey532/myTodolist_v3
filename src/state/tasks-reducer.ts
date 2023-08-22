import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { addTodolistACType, removeTodolistACType } from "./todolists-reducer"

const initialState: TasksStateType = {
    // ["todolistId1"]: [
    //     { id: v1(), title: "HTML&CSS", isDone: true },
    //     { id: v1(), title: "JS", isDone: true },
    // ],
    // ["todolistId2"]: [
    //     { id: v1(), title: "Milk", isDone: true },
    //     { id: v1(), title: "React", isDone: true },
    // ],
};

export const tasksReducer = (state = initialState, action: TasksReducerActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(el => el.id !== action.payload.taskId)
            }
        } case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]:
                    [{ id: v1(), title: action.payload.title, isDone: false },
                    ...state[action.payload.todolistId]]
            }
        } case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? { ...t, isDone: action.payload.isDone } : t)
            }
        } case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? { ...t, title: action.payload.title } : t)
            }
        } case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        } case "REMOVE-TODOLIST": {
            const { [action.payload.id]: [], ...rest } = state
            return rest
        }
        default:
            return state;
    }
}

export type TasksReducerActionType =
    | RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType

//actionsTypes
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

//actionCreatures
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskId,
            todolistId
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todolistId
        }
    } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            taskId,
            title,
            todolistId
        }
    } as const
}
