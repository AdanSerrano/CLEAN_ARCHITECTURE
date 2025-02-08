import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ITodosRepository } from "@/src/application/repositories-interfaces/todos/todos.repository.interface";
import { InputParseError } from "@/src/entities/errors/common";
import { Todo } from "@/src/entities/models/todos.model";

export type IUpdateTodoUseCase = ReturnType<typeof updateTodoUseCase>;

export const updateTodoUseCase =
    (
        instrumentationService: IInstrumentationService,
        todosRepository: ITodosRepository
    ) =>
        (
            input: {
                todoId: number;
                text?: string;
                done?: boolean;
            },
            tx?: any
        ): Promise<Todo> => {
            return instrumentationService.startSpan(
                { name: 'updateTodo Use Case', op: 'function' },
                async () => {
                    if (!input.text && input.done === undefined) {
                        throw new InputParseError('At least one field (text or done) must be provided');
                    }

                    if (input.text && input.text.length < 4) {
                        throw new InputParseError('Todo must be at least 4 chars');
                    }

                    const updatedTodo = await todosRepository.updateTodo(
                        input.todoId,
                        {
                            ...(input.text !== undefined && { text: input.text }),
                            ...(input.done !== undefined && { done: input.done }),
                        },
                        tx
                    );

                    return updatedTodo;
                }
            );
        };
