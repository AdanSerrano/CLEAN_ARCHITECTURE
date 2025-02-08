import { ICreatedTodoUseCase } from '@/infrastructure/use-cases/todos/create.todo.use-case';
import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface';
import { InputParseError } from '@/src/entities/errors/common';
import { Todo } from '@/src/entities/models/todos.model';
import { z } from 'zod';

function presenter(
    todos: Todo[],
    instrumentationService: IInstrumentationService
) {
    return instrumentationService.startSpan(
        { name: 'createTodo Presenter', op: 'serialize' },
        () => {
            return todos.map((todo) => ({
                id: todo.id,
                text: todo.text,
                done: todo.done,
            }));
        }
    );
}

const inputSchema = z.object({ todo: z.string().min(1) });

export type ICreateTodoController = ReturnType<typeof createTodoController>;

export const createTodoController =
    (
        instrumentationService: IInstrumentationService,
        transactionManagerService: ITransactionManagerService,
        createTodoUseCase: ICreatedTodoUseCase
    ) =>
        async (
            input: Partial<z.infer<typeof inputSchema>>
        ): Promise<ReturnType<typeof presenter>> => {
            return await instrumentationService.startSpan(
                {
                    name: 'createTodo Controller',
                },
                async () => {
                    const { data, error: inputParseError } = inputSchema.safeParse(input);

                    if (inputParseError) {
                        throw new InputParseError('Invalid data', { cause: inputParseError });
                    }

                    const todosFromInput = data.todo.split(',').map((t) => t.trim());

                    const todos = await instrumentationService.startSpan(
                        { name: 'Create Todo Transaction' },
                        async () =>
                            transactionManagerService.startTransaction(async (tx) => {
                                try {
                                    return await Promise.all(
                                        todosFromInput.map((t) =>
                                            createTodoUseCase({ text: t }, tx)
                                        )
                                    );
                                } catch (err) {
                                    console.error('Rolling back!', err);
                                    tx.rollback();
                                }
                            })
                    );
                    return presenter(todos ?? [], instrumentationService);
                }
            );
        };
