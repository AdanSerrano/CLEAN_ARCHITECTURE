import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { IToggleTodoUseCase } from '@/infrastructure/use-cases/todos/toggle-todo.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import { Todo } from '@/src/entities/models/todos.model';
import { z } from 'zod';

function presenter(
    todo: Todo,
    instrumentationService: IInstrumentationService
) {
    return instrumentationService.startSpan(
        { name: 'toggleTodo Presenter', op: 'serialize' },
        () => ({
            id: todo.id,
            text: todo.text,
            done: todo.done,
        })
    );
}
const inputSchema = z.object({ todoId: z.number() });

export type IToggleTodoController = ReturnType<typeof toggleTodoController>;

export const toggleTodoController =
    (
        instrumentationService: IInstrumentationService,
        toggleTodoUseCase: IToggleTodoUseCase
    ) =>
        async (
            input: Partial<z.infer<typeof inputSchema>>,
        ): Promise<ReturnType<typeof presenter>> => {
            return await instrumentationService.startSpan(
                { name: 'toggleTodo Controller' },
                async () => {
                    const { data, error: inputParseError } = inputSchema.safeParse(input);

                    if (inputParseError) {
                        throw new InputParseError('Invalid data', { cause: inputParseError });
                    }

                    const todo = await toggleTodoUseCase(
                        { todoId: data.todoId });

                    return presenter(todo, instrumentationService);
                }
            );
        };
