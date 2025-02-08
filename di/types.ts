import { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";
import { ICreateTodoController } from "@/infrastructure/controllers/todos/create-todo.controller";
import { ICreatedTodoUseCase } from "@/infrastructure/use-cases/todos/create.todo.use-case";
import { IDeleteTodoController } from "@/infrastructure/controllers/todos/delete-todo.controller";
import { IDeleteTodoUseCase } from "@/infrastructure/use-cases/todos/delete-todo.use-case";
import { IGetAllTodosController } from "@/infrastructure/controllers/todos/get-all-todos.controller";
import { IGetAllTodosUseCase } from "@/infrastructure/use-cases/todos/get-todos.use-case";
import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ITodosRepository } from "@/src/application/repositories-interfaces/todo/todo.repository.interface";
import { ITransactionManagerService } from "@/src/application/services/transaction-manager.service.interface";
import { IUpdateTodoController } from "@/infrastructure/controllers/todos/update-todo.controller";
import { IUpdateTodoUseCase } from "@/infrastructure/use-cases/todos/update-todo.use.case";

export const DI_SYMBOLS = {
    // Services
    ITransactionManagerService: Symbol.for('ITransactionManagerService'),
    IInstrumentationService: Symbol.for('IInstrumentationService'),
    ICrashReporterService: Symbol.for('ICrashReporterService'),

    // Repositories 
    ITodosRepository: Symbol.for('ITodosRepository'),

    //Use Cases
    ICreateTodoUseCase: Symbol.for('ICreateTodoUseCase'),
    IDeleteTodoUseCase: Symbol.for('IDeleteTodoUseCase'),
    IGetAllTodosUseCase: Symbol.for('IGetAllTodosUseCase'),
    IUpdateTodoUseCase: Symbol.for('IUpdateTodoUseCase'),

    // Controllers
    ICreateTodoController: Symbol.for('ICreateTodoController'),
    IGetAllTodosController: Symbol.for('IGetAllTodosController'),
    IDeleteTodoController: Symbol.for('IDeleteTodoController'),
    IUpdateTodoController: Symbol.for('IUpdateTodoController'),
}

export interface DI_RETURN_TYPES {
    // Services
    ITransactionManagerService: ITransactionManagerService;
    IInstrumentationService: IInstrumentationService;
    ICrashReporterService: ICrashReporterService;

    // Respositories
    ITodosRepository: ITodosRepository;

    // Use Cases
    ICreateTodoUseCase: ICreatedTodoUseCase;
    IDeleteTodoUseCase: IDeleteTodoUseCase;
    IGetAllTodosUseCase: IGetAllTodosUseCase;
    IUpdateTodoUseCase: IUpdateTodoUseCase;

    // Controllers
    ICreateTodoController: ICreateTodoController;
    IGetAllTodosController: IGetAllTodosController;
    IDeleteTodoController: IDeleteTodoController;
    IUpdateTodoController: IUpdateTodoController;
}