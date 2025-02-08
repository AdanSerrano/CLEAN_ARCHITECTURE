import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ITodosRepository } from "@/src/application/repositories-interfaces/todo/todo.repository.interface";
import { InputParseError } from "@/src/entities/errors/common";
import { Todo } from "@/src/entities/models/todo.model";

export type ICreatedTodoUseCase = ReturnType<typeof createTodoUseCase>

export const createTodoUseCase =
    (
        instrumentationService: IInstrumentationService,
        todosRepository: ITodosRepository
    ) =>
        (
            input: {
                text: string;
            },
            tx?: any
        ): Promise<Todo> => {
            return instrumentationService.startSpan(
                { name: 'createTodo Use Case', op: 'function' },
                async () => {
                    if (input.text.length < 4) {
                        throw new InputParseError('Todo must be at least 4 chars');
                    }

                    const newTodo = await todosRepository.createTodo(
                        {
                            text: input.text,
                            done: false,
                        },
                        tx
                    );

                    return newTodo;
                }
            );
        };
