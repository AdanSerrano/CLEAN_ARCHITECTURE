import { Todo, TodoInsert } from "@/src/entities/models/todo.model";

export interface ITodosRepository {
    createTodo(todo: TodoInsert): Promise<Todo>;
    getTodo(id: number): Promise<Todo | undefined>;
    updateTodo(input: Partial<TodoInsert>, id?: number): Promise<Todo>;
    getAllTodos(): Promise<Todo[]>;
    deleteTodo(id?: number): Promise<void>;
}