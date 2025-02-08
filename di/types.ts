import { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";
import { ICreateTodoController } from "@/infrastructure/controllers/todos/create-todo.controller";
import { ICreatedTodoUseCase } from "@/infrastructure/use-cases/todos/create.todo.use-case";
import { IDeleteTodoUseCase } from "@/infrastructure/use-cases/todos/delete-todo.use-case";
import { IGetAllTodosController } from "@/infrastructure/controllers/todos/get-all-todos.controller";
import { IGetAllTodosUseCase } from "@/infrastructure/use-cases/todos/get-todos.use-case";
import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ITodosRepository } from "@/src/application/repositories-interfaces/todos/todos.repository.interface";
import { IToggleTodoController } from "@/infrastructure/controllers/todos/toogle-todo.controller";
import { IToggleTodoUseCase } from "@/infrastructure/use-cases/todos/toggle-todo.use-case";
import { ITransactionManagerService } from "@/src/application/services/transaction-manager.service.interface";

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
    IToggleTodoUseCase: Symbol.for('IToggleTodoUseCase'),


    // Controllers
    ICreateTodoController: Symbol.for('ICreateTodoController'),
    IGetAllTodosController: Symbol.for('IGetAllTodosController'),
    IToggleTodoController: Symbol.for('IToggleTodoController'),
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
    IToggleTodoUseCase: IToggleTodoUseCase;

    // Use Case


    // Controllers
    ICreateTodoController: ICreateTodoController;
    IGetAllTodosController: IGetAllTodosController;
    IToggleTodoController: IToggleTodoController;
}