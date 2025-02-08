import { IDeleteTodoUseCase } from '@/infrastructure/use-cases/todos/delete-todo.use-case';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface';

export type IDeleteTodoController = ReturnType<typeof deleteTodoController>;

export const deleteTodoController =
    (
        instrumentationService: IInstrumentationService,
        transactionManagerService: ITransactionManagerService,
        deleteTodoUseCase: IDeleteTodoUseCase
    ) =>
        async (
            id?: number
        ): Promise<{ success: boolean }> => {
            return await instrumentationService.startSpan(
                { name: 'deleteTodo Controller' },
                async () => {

                    const success = await instrumentationService.startSpan(
                        { name: 'Delete Todo Transaction' },
                        async () =>
                            transactionManagerService.startTransaction(async () => {
                                try {
                                    await deleteTodoUseCase(id!);
                                    return true;
                                } catch (err) {
                                    console.error('Rolling back!', err);
                                    return false;
                                }
                            })
                    );

                    return { success };
                }
            );
        };
