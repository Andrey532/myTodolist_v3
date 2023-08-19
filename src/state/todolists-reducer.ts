import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export const todolistsReducer = (state: TodolistType[], action: TodolistsReducerACType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((el) => el.id !== action.payload.id);
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = { id: action.payload.todolistId, title: action.payload.title, filter: "all" };
            return [...state, newTodolist];
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((el) =>
                el.id === action.payload.id ? { ...el, title: action.payload.title } : el);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((el) =>
                el.id === action.payload.todolistId ? { ...el, filter: action.payload.value } : el);
        }
        default:
            return state;
    }
};

export type TodolistsReducerACType =
    | removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType;

//actionsTypes
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
export type addTodolistACType = ReturnType<typeof addTodolistAC>;
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;

//actionCreatures
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id,
        },
    } as const;
};

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title,
            todolistId: v1()
        },
    } as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id,
            title,
        },
    } as const;
};

export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            value,
        },
    } as const;
};
