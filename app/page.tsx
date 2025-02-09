import { CreateTodo } from "./_components/todo/todo.add";
import { Todo } from "@/infrastructure/entities/models/todo.model";
import { Todos } from "./_components/todo/todos.list";
import { getTodos } from "@/infrastructure/actions/todos/get-all-todo.actions";

export default async function Home() {
  let todos: Todo[];
  try {
    todos = await getTodos();
  } catch (err) {
    throw err;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 mt-20 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  );
}
