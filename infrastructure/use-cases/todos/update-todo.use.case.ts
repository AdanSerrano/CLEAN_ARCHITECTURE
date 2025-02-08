import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ITodosRepository } from "@/src/application/repositories-interfaces/todo/todo.repository.interface";
import { Todo } from "@/src/entities/models/todo.model";

export type IUpdateTodoUseCase = ReturnType<typeof updateTodoUseCase>;

export const updateTodoUseCase =
    (
        instrumentationService: IInstrumentationService,
        todosRepository: ITodosRepository
    ) =>
        (
            input: Partial<Todo>,
            id?: number
        ): Promise<Todo> => {
            return instrumentationService.startSpan(
                { name: 'updateTodo Use Case', op: 'function' },
                async () => {


                    const updatedTodo = await todosRepository.updateTodo(
                        input,
                        id
                    );

                    return updatedTodo;
                }
            );
        };