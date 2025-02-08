import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ITodosRepository } from "@/src/application/repositories-interfaces/todo/todo.repository.interface";

export type IDeleteTodoUseCase = ReturnType<typeof deleteTodoUseCase>;

export const deleteTodoUseCase =
    (
        instrumentationService: IInstrumentationService,
        todosRepository: ITodosRepository
    ) =>
        (
            id?: number
        ): Promise<any> => {
            return instrumentationService.startSpan(
                { name: 'deleteTodo Use Case', op: 'function' },
                async () => {
                    await todosRepository.deleteTodo(id);
                }
            );
        };
