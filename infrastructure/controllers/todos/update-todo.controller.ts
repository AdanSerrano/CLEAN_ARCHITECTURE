import { Todo, insertTodoSchema } from '@/infrastructure/entities/models/todo.model';

import { IInstrumentationService } from '@/infrastructure/services-interface/instrumentation.service.interface';
import { ITodosRepository } from '@/infrastructure/repositories-interface/todos/todo.repository.interface';
import { InputParseError } from '@/infrastructure/entities/errors/common';

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
        todosRepository: ITodosRepository
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
                        async () => {
                            try {
                                return await todosRepository.updateTodo(data, id);
                            } catch (err) {
                                console.error('Rolling back!', err);
                                throw err;
                            }
                        }
                    );

                    return presenter(updatedTodo, instrumentationService);
                }
            );
        };
