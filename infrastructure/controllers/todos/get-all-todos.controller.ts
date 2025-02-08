import { IGetAllTodosUseCase } from '@/infrastructure/use-cases/todos/get-todos.use-case';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { Todo } from '@/src/entities/models/todos.model';

function presenter(
    todos: Todo[],
    instrumentationService: IInstrumentationService
) {
    return instrumentationService.startSpan(
        { name: 'getTodosForUser Presenter', op: 'serialize' },
        () =>
            todos.map((t) => ({
                id: t.id,
                text: t.text,
                done: t.done,
            }))
    );
}

export type IGetAllTodosController = ReturnType<
    typeof getAllTodosController
>;

export const getAllTodosController =
    (
        instrumentationService: IInstrumentationService,
        getTodosForUserUseCase: IGetAllTodosUseCase
    ) =>
        async (
        ): Promise<ReturnType<typeof presenter>> => {
            return await instrumentationService.startSpan(
                { name: 'getTodosForUser Controller' },
                async () => {

                    const todos = await getTodosForUserUseCase();

                    return presenter(todos, instrumentationService);
                }
            );
        };
