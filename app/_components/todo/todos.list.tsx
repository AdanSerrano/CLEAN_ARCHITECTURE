'use client';

import { ModalTodoUpdate } from './todo.update';
import { Todo } from '@/src/entities/models/todo.model';
import { TodoDelete } from './todo.delete';
import { cn } from '../utils';

export function Todos({ todos }: { todos: Todo[] }) {

  return (
    <ul className="w-full">
      {todos.length > 0 ? (
        todos.map((todo) => {
          if (!todo.id) return null;
          return (
            <li
              key={todo.id}
              className="h-10 flex items-center gap-2 w-full hover:bg-muted/50 active:bg-muted rounded-sm p-1"
            >
              <span
                className={cn('flex-1', {
                  'text-muted-foreground line-through': todo.done,
                })}
              >
                {todo.text}
              </span>

              <div className="flex gap-2">
                <ModalTodoUpdate todo={todo} />
                <TodoDelete id={todo.id} />
              </div>
            </li>
          )
        })
      ) : (
        <p>No hay tareas. Crea algunas para comenzar!</p>
      )}
    </ul>
  );
}