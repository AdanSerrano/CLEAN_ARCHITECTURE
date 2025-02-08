import { IDeleteTodoUseCase } from '@/infrastructure/use-cases/todos/delete-todo.use-case';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface';
import { InputParseError } from '@/src/entities/errors/common';
import { z } from 'zod';

const inputSchema = z.object({ todoId: z.number() });

export type IDeleteTodoController = ReturnType<typeof deleteTodoController>;

export const deleteTodoController =
    (
        instrumentationService: IInstrumentationService,
        transactionManagerService: ITransactionManagerService,
        deleteTodoUseCase: IDeleteTodoUseCase
    ) =>
        async (
            input: Partial<z.infer<typeof inputSchema>>
        ): Promise<{ success: boolean }> => {
            return await instrumentationService.startSpan(
                { name: 'deleteTodo Controller' },
                async () => {
                    const { data, error: inputParseError } = inputSchema.safeParse(input);

                    if (inputParseError) {
                        throw new InputParseError('Invalid data', { cause: inputParseError });
                    }

                    const success = await instrumentationService.startSpan(
                        { name: 'Delete Todo Transaction' },
                        async () =>
                            transactionManagerService.startTransaction(async (tx) => {
                                try {
                                    await deleteTodoUseCase({ todoId: data.todoId }, tx);
                                    return true;
                                } catch (err) {
                                    console.error('Rolling back!', err);
                                    tx.rollback();
                                    return false;
                                }
                            })
                    );

                    return { success };
                }
            );
        };
