import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface';
import { IUpdateTodoUseCase } from '@/infrastructure/use-cases/todos/update-todo.use.case';
import { InputParseError } from '@/src/entities/errors/common';
import { Todo } from '@/src/entities/models/todos.model';
import { z } from 'zod';

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

const inputSchema = z.object({
    todoId: z.number(),
    text: z.string().min(4).optional(), // `text` opcional, pero mínimo 4 caracteres si se proporciona
    done: z.boolean().optional(), // `done` opcional
});

export type IUpdateTodoController = ReturnType<typeof updateTodoController>;

export const updateTodoController =
    (
        instrumentationService: IInstrumentationService,
        transactionManagerService: ITransactionManagerService,
        updateTodoUseCase: IUpdateTodoUseCase
    ) =>
        async (
            input: Partial<z.infer<typeof inputSchema>>
        ): Promise<ReturnType<typeof presenter>> => {
            return await instrumentationService.startSpan(
                { name: 'updateTodo Controller' },
                async () => {
                    // Validar el input con Zod
                    const { data, error: inputParseError } = inputSchema.safeParse(input);

                    if (inputParseError) {
                        throw new InputParseError('Invalid data', { cause: inputParseError });
                    }

                    if (!data.text && data.done === undefined) {
                        throw new InputParseError('At least one field must be provided for update.');
                    }

                    // Iniciar la transacción para actualizar el TODO
                    const updatedTodo = await instrumentationService.startSpan(
                        { name: 'Update Todo Transaction' },
                        async () =>
                            transactionManagerService.startTransaction(async (tx) => {
                                try {
                                    return await updateTodoUseCase(
                                        { todoId: data.todoId, text: data.text, done: data.done },
                                        tx
                                    );
                                } catch (err) {
                                    console.error('Rolling back!', err);
                                    tx.rollback();
                                    throw err;
                                }
                            })
                    );

                    return presenter(updatedTodo, instrumentationService);
                }
            );
        };
