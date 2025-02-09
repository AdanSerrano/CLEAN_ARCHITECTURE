import { ICrashReporterService } from "@/infrastructure/services-interface/crash-reporter.service.interface";
import { ICreateTodoController } from "@/infrastructure/controllers/todos/create-todo.controller";
import { IDeleteTodoController } from "@/infrastructure/controllers/todos/delete-todo.controller";
import { IGetAllTodosController } from "@/infrastructure/controllers/todos/get-all-todos.controller";
import { IInstrumentationService } from "@/infrastructure/services-interface/instrumentation.service.interface";
import { ITodosRepository } from "@/infrastructure/repositories-interface/todos/todo.repository.interface";
import { IUpdateTodoController } from "@/infrastructure/controllers/todos/update-todo.controller";

export const DI_SYMBOLS = {
    // Services
    IInstrumentationService: Symbol.for('IInstrumentationService'),
    ICrashReporterService: Symbol.for('ICrashReporterService'),

    // Repositories 
    ITodosRepository: Symbol.for('ITodosRepository'),

    // Controllers
    ICreateTodoController: Symbol.for('ICreateTodoController'),
    IGetAllTodosController: Symbol.for('IGetAllTodosController'),
    IDeleteTodoController: Symbol.for('IDeleteTodoController'),
    IUpdateTodoController: Symbol.for('IUpdateTodoController'),
}

export interface DI_RETURN_TYPES {
    // Services
    IInstrumentationService: IInstrumentationService;
    ICrashReporterService: ICrashReporterService;

    // Respositories
    ITodosRepository: ITodosRepository;

    // Controllers
    ICreateTodoController: ICreateTodoController;
    IGetAllTodosController: IGetAllTodosController;
    IDeleteTodoController: IDeleteTodoController;
    IUpdateTodoController: IUpdateTodoController;
}