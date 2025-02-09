import { IInstrumentationService } from '@/infrastructure/services-interface/instrumentation.service.interface';
import { ITodosRepository } from '@/infrastructure/repositories-interface/todos/todo.repository.interface';
import { Todo } from '@/infrastructure/entities/models/todo.model';

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
        todosRepository: ITodosRepository
    ) =>
        async (
        ): Promise<ReturnType<typeof presenter>> => {
            return await instrumentationService.startSpan(
                { name: 'getTodosForUser Controller' },
                async () => {

                    const todos = await todosRepository.getAllTodos();

                    return presenter(todos, instrumentationService);
                }
            );
        };
