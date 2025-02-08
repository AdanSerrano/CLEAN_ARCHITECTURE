import { DI_SYMBOLS } from "../types";
import { TodosRepository } from "@/infrastructure/repositories/todos/todos.repository";
import { createModule } from "@evyweb/ioctopus";
import { createTodoController } from "@/infrastructure/controllers/todos/create-todo.controller";
import { createTodoUseCase } from "@/infrastructure/use-cases/todos/create.todo.use-case";
import { deleteTodoController } from "@/infrastructure/controllers/todos/delete-todo.controller";
import { deleteTodoUseCase } from "@/infrastructure/use-cases/todos/delete-todo.use-case";
import { getAllTodosController } from "@/infrastructure/controllers/todos/get-all-todos.controller";
import { getAllTodosUseCase } from "@/infrastructure/use-cases/todos/get-todos.use-case";
import { updateTodoController } from "@/infrastructure/controllers/todos/update-todo.controller";
import { updateTodoUseCase } from "@/infrastructure/use-cases/todos/update-todo.use.case";

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
        .bind(DI_SYMBOLS.IUpdateTodoUseCase)
        .toHigherOrderFunction(updateTodoUseCase, [
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
        .bind(DI_SYMBOLS.ICreateTodoController)
        .toHigherOrderFunction(createTodoController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITransactionManagerService,
            DI_SYMBOLS.ICreateTodoUseCase,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IUpdateTodoController)
        .toHigherOrderFunction(updateTodoController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.IUpdateTodoUseCase,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IGetAllTodosController)
        .toHigherOrderFunction(getAllTodosController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.IGetAllTodosUseCase,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IDeleteTodoController)
        .toHigherOrderFunction(deleteTodoController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.IGetAllTodosUseCase,
        ]);


    return todosModule;
}