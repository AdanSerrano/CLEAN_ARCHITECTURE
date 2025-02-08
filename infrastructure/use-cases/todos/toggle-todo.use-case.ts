import type { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ITodosRepository } from '@/src/application/repositories-interfaces/todos/todos.repository.interface';
import type { ITransaction } from '@/src/entities/models/transaction.interface';
import { NotFoundError } from '@/src/entities/errors/common';
import { Todo } from '@/src/entities/models/todos.model';

export type IToggleTodoUseCase = ReturnType<typeof toggleTodoUseCase>;

export const toggleTodoUseCase =
  (
    instrumentationService: IInstrumentationService,
    todosRepository: ITodosRepository
  ) =>
    (
      input: {
        todoId: number;
      },
      tx?: ITransaction
    ): Promise<Todo> => {
      return instrumentationService.startSpan(
        { name: 'toggleTodo Use Case', op: 'function' },
        async () => {
          const todo = await todosRepository.getTodo(input.todoId);

          if (!todo) {
            throw new NotFoundError('Todo does not exist');
          }

          const updatedTodo = await todosRepository.updateTodo(
            todo.id,
            {
              done: !todo.done,
            },
            tx
          );

          return updatedTodo;
        }
      );
    };
