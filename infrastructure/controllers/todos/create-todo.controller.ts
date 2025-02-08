import { Todo, selectTodoSchema } from '@/src/entities/models/todo.model';

import { ICreatedTodoUseCase } from '@/infrastructure/use-cases/todos/create.todo.use-case';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface';
import { InputParseError } from '@/src/entities/errors/common';

function presenter(
    todos: Todo[],
    instrumentationService: IInstrumentationService
) {
    return instrumentationService.startSpan(
        { name: 'createTodo Presenter', op: 'serialize' },
        () => {
            return todos.map((todo) => ({
                id: todo.id,
                text: todo.text,
                done: todo.done,
            }));
        }
    );
}


export type ICreateTodoController = ReturnType<typeof createTodoController>;

export const createTodoController =
    (
        instrumentationService: IInstrumentationService,
        transactionManagerService: ITransactionManagerService,
        createTodoUseCase: ICreatedTodoUseCase
    ) =>
        async (
            input: Partial<Todo>
        ): Promise<ReturnType<typeof presenter>> => {
            return await instrumentationService.startSpan(
                {
                    name: 'createTodo Controller',
                },
                async () => {
                    const { data, error: inputParseError } = selectTodoSchema.safeParse(input);

                    if (inputParseError) {
                        throw new InputParseError('Invalid data', { cause: inputParseError });
                    }

                    const todosFromInput = data.text.split(',').map((t) => t.trim());

                    // Eliminamos el manejo de transacciones y simplemente creamos los todos
                    const todos = await Promise.all(
                        todosFromInput.map((t) =>
                            createTodoUseCase({ text: t })
                        )
                    );

                    return presenter(todos, instrumentationService);
                }
            );
        };