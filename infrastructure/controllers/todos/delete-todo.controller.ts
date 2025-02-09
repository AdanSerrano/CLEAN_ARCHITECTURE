import { IInstrumentationService } from '@/infrastructure/services-interface/instrumentation.service.interface';
import { ITodosRepository } from '@/infrastructure/repositories-interface/todos/todo.repository.interface';

export type IDeleteTodoController = ReturnType<typeof deleteTodoController>;

export const deleteTodoController =
    (
        instrumentationService: IInstrumentationService,
        todosRepository: ITodosRepository,
    ) =>
        async (
            id?: number
        ): Promise<{ success: boolean }> => {
            return await instrumentationService.startSpan(
                { name: 'deleteTodo Controller' },
                async () => {

                    const success = await instrumentationService.startSpan(
                        { name: 'Delete Todo Transaction' },
                        async () => {
                            try {
                                await todosRepository.deleteTodo(id!);
                                return true;
                            } catch (err) {
                                console.error('Rolling back!', err);
                                return false;
                            }
                        }
                    );

                    return { success };
                }
            );
        };
