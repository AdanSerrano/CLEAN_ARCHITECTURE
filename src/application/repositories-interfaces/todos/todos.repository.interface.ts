import { Todo, TodoInsert } from "@/src/entities/models/todos.model";

export interface ITodosRepository {
    createTodo(todo: TodoInsert, tx?: any): Promise<Todo>;
    getTodo(id: number): Promise<Todo | undefined>;
    updateTodo(id: number, input: Partial<TodoInsert>, tx?: any): Promise<Todo>;
    getAllTodos(): Promise<Todo[]>;
    deleteTodo(id: number, tx?: any): Promise<void>;
}


export interface TodoInterfaceResponse {
    id: string;
    text: string;
    done: boolean
}