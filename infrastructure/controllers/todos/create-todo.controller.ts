import { Todo, selectTodoSchema } from '@/infrastructure/entities/models/todo.model';

import { IInstrumentationService } from '@/infrastructure/services-interface/instrumentation.service.interface';
import { ITodosRepository } from '@/infrastructure/repositories-interface/todos/todo.repository.interface';
import { InputParseError } from '@/infrastructure/entities/errors/common';

function presenter(
    todo: Todo,
    instrumentationService: IInstrumentationService
) {
    return instrumentationService.startSpan(
        { name: 'createTodo Presenter', op: 'serialize' },
        () => ({
            id: todo.id,
            text: todo.text,
            done: todo.done,
        })
    );
}

export type ICreateTodoController = ReturnType<typeof createTodoController>;

export const createTodoController = (
    instrumentationService: IInstrumentationService,
    todosRepository: ITodosRepository
) => async (input: Partial<Todo>): Promise<ReturnType<typeof presenter>> => {
    return await instrumentationService.startSpan(
        { name: 'createTodo Controller' },
        async () => {
            const { data, error: inputParseError } = selectTodoSchema.safeParse(input);
            if (inputParseError) {
                throw new InputParseError('Invalid data', { cause: inputParseError });
            }

            if (data.text.length < 4) {
                throw new InputParseError('Todo must be at least 4 chars');
            }

            const todo = await todosRepository.createTodo({
                text: data.text,
                done: false
            });

            return presenter(todo, instrumentationService);
        }
    );
};