import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ITodosRepository } from "@/src/application/repositories-interfaces/todos/todos.repository.interface";
import { ITransaction } from "@/src/entities/models/transaction.interface";
import { NotFoundError } from "@/src/entities/errors/common";
import { Todo } from "@/src/entities/models/todos.model";

export type IDeleteTodoUseCase = ReturnType<typeof deleteTodoUseCase>;

export const deleteTodoUseCase =
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
                { name: 'deleteTodo Use Case', op: 'function' },
                async () => {
                    const todo = await todosRepository.getTodo(input.todoId);

                    if (!todo) {
                        throw new NotFoundError('Todo does not exist');
                    }
                    await todosRepository.deleteTodo(todo.id, tx);

                    return todo;
                }
            );
        };
