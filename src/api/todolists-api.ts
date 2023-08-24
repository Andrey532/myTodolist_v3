import axios from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "api-key": "d5c325f4-1d70-41dd-b0d6-d89eeb3816ce"
    }
})

export const AuthAPI = {

}

export const TodolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolists() {
        return instance.post<ResponseTodolistType<{item: TodolistType}>>("todo-lists", { title: "shwabra" })
    },
    deleteTodolists(todoId: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todoId}`)
    },
    updateTodolists(title: string, todoId: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todoId}`, { title })
    },
}

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseTodolistType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}
