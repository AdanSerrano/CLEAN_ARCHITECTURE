import type { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ITodosRepository } from '@/src/application/repositories-interfaces/todos/todos.repository.interface';
import { Todo } from '@/src/entities/models/todos.model';

export type IGetAllTodosUseCase = ReturnType<typeof getAllTodosUseCase>;

export const getAllTodosUseCase =
    (
        instrumentationService: IInstrumentationService,
        todosRepository: ITodosRepository
    ) =>
        (): Promise<Todo[]> => {
            return instrumentationService.startSpan(
                {
                    name: 'getAllTodos UseCase',
                    op: 'function',
                    attributes: {
                        'service.name': 'todos-service',
                        'operation.type': 'query'
                    }
                },
                async () => {
                    const todos = await todosRepository.getAllTodos();
                    return todos;
                }
            );
        };
