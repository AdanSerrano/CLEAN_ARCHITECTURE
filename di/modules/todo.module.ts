import { DI_SYMBOLS } from "../types";
import { TodosRepository } from "@/infrastructure/repositories/todos/todos.repository";
import { createModule } from "@evyweb/ioctopus";
import { createTodoController } from "@/infrastructure/controllers/todos/create-todo.controller";
import { deleteTodoController } from "@/infrastructure/controllers/todos/delete-todo.controller";
import { getAllTodosController } from "@/infrastructure/controllers/todos/get-all-todos.controller";
import { updateTodoController } from "@/infrastructure/controllers/todos/update-todo.controller";

export function createTodosModules() {
    const todosModule = createModule();

    // Repository
    todosModule
        .bind(DI_SYMBOLS.ITodosRepository)
        .toClass(TodosRepository, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ICrashReporterService,
        ]);

    // Controllers
    todosModule
        .bind(DI_SYMBOLS.ICreateTodoController)
        .toHigherOrderFunction(createTodoController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITodosRepository,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IUpdateTodoController)
        .toHigherOrderFunction(updateTodoController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITodosRepository,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IGetAllTodosController)
        .toHigherOrderFunction(getAllTodosController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITodosRepository,
        ]);

    todosModule
        .bind(DI_SYMBOLS.IDeleteTodoController)
        .toHigherOrderFunction(deleteTodoController, [
            DI_SYMBOLS.IInstrumentationService,
            DI_SYMBOLS.ITodosRepository,
        ]);

    return todosModule;
}