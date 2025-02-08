import { Todo, insertTodoSchema } from '@/src/entities/models/todo.model';

import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface';
import { IUpdateTodoUseCase } from '@/infrastructure/use-cases/todos/update-todo.use.case';
import { InputParseError } from '@/src/entities/errors/common';

function presenter(
    todo: Todo,
    instrumentationService: IInstrumentationService
) {
    return instrumentationService.startSpan(
        { name: 'updateTodo Presenter', op: 'serialize' },
        () => ({
            id: todo.id,
            text: todo.text,
            done: todo.done,
        })
    );
}

export type IUpdateTodoController = ReturnType<typeof updateTodoController>;

export const updateTodoController =
    (
        instrumentationService: IInstrumentationService,
        transactionManagerService: ITransactionManagerService,
        updateTodoUseCase: IUpdateTodoUseCase
    ) =>
        async (
            input: Partial<Todo>,
            id?: number
        ): Promise<ReturnType<typeof presenter>> => {
            return await instrumentationService.startSpan(
                { name: 'updateTodo Controller' },
                async () => {
                    const { data, error: inputParseError } = insertTodoSchema.safeParse(input);

                    if (inputParseError) {
                        throw new InputParseError('Invalid data', { cause: inputParseError });
                    }

                    if (!data.text && data.done === undefined) {
                        throw new InputParseError('At least one field must be provided for update.');
                    }

                    const updatedTodo = await instrumentationService.startSpan(
                        { name: 'Update Todo Transaction' },
                        async () =>
                            transactionManagerService.startTransaction(async () => {
                                try {
                                    return await updateTodoUseCase(data, id);
                                } catch (err) {
                                    console.error('Rolling back!', err);
                                    throw err;
                                }
                            })
                    );

                    return presenter(updatedTodo, instrumentationService);
                }
            );
        };
