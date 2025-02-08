import { DI_SYMBOLS } from "../types";
import { TodosRepository } from "@/infrastructure/repositories/todos/todos.repository";
import { createModule } from "@evyweb/ioctopus";
import { createTodoController } from "@/infrastructure/controllers/todos/create-todo.controller";
import { createTodoUseCase } from "@/infrastructure/use-cases/todos/create.todo.use-case";
import { deleteTodoUseCase } from "@/infrastructure/use-cases/todos/delete-todo.use-case";
import { getAllTodosController } from "@/infrastructure/controllers/todos/get-all-todos.controller";
import { getAllTodosUseCase } from "@/infrastructure/use-cases/todos/get-todos.use-case";
import { toggleTodoController } from "@/infrastructure/controllers/todos/toogle-todo.controller";
import { toggleTodoUseCase } from "@/infrastructure/use-cases/todos/toggle-todo.use-case";

export function createTodosModules() {
    const todosModule = createModule();
    todosModule
        .bind(DI_SYMBOLS.ITodosRepository)
        .toClass(TodosRepository, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ICrashReporterService,
        ]);

    todosModule
        .bind(DI_SYMBOLS.ICreateTodoUseCase)
        .toHigherOrderFunction(createTodoUseCase, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITodosRepository,
        ]);


    todosModule
        .bind(DI_SYMBOLS.IDeleteTodoUseCase)
        .toHigherOrderFunction(deleteTodoUseCase, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITodosRepository,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IGetAllTodosUseCase)
        .toHigherOrderFunction(getAllTodosUseCase, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITodosRepository,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IToggleTodoUseCase)
        .toHigherOrderFunction(toggleTodoUseCase, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITodosRepository,
        ]);


    todosModule
        .bind(DI_SYMBOLS.ICreateTodoController)
        .toHigherOrderFunction(createTodoController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITransactionManagerService,
            DI_SYMBOLS.ICreateTodoUseCase,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IGetAllTodosController)
        .toHigherOrderFunction(getAllTodosController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.IGetAllTodosUseCase,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IToggleTodoController)
        .toHigherOrderFunction(toggleTodoController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.IToggleTodoUseCase,
        ]);

    return todosModule;
}