import { Todo, TodoInsert } from "@/src/entities/models/todos.model";
import { Transaction, db } from "@/db/drizzle";

import { DatabaseOperationError } from "@/src/entities/errors/common";
import { ICrashReporterService } from "@/src/application/services/crash-reporter.service.interface";
import { IInstrumentationService } from "@/src/application/services/instrumentation.service.interface";
import { ITodosRepository } from "@/src/application/repositories-interfaces/todos/todos.repository.interface";
import { eq } from "drizzle-orm";
import { todos } from "@/db/schema";

export class TodosRepository implements ITodosRepository {
    constructor(
        private readonly instrumentationService: IInstrumentationService,
        private readonly crashReporterService: ICrashReporterService
    ) { }

    private async executeWithInstrumentation<T>(
        query: { toSQL(): { sql: string; params: unknown[] } },
        executor: () => Promise<T>,
        operation: string
    ): Promise<T> {
        const { sql, params } = query.toSQL();
        return this.instrumentationService.startSpan(
            {
                name: sql,
                op: operation,
                attributes: {
                    'db.system': 'postgresql',
                    'db.params': params
                },
            },
            () => executor()
        );
    }

    async createTodo(todo: TodoInsert, tx?: Transaction): Promise<Todo> {
        const invoker = tx ?? db;
        try {
            const query = invoker.insert(todos)
                .values(todo)
                .returning();

            const [created] = await this.executeWithInstrumentation(
                query,
                () => query.execute(),
                'db.insert'
            );

            if (!created) {
                throw new DatabaseOperationError('Cannot create todo');
            }

            return created;
        } catch (err) {
            this.crashReporterService.report(err);
            throw err;
        }
    }

    async getTodo(id: number): Promise<Todo | undefined> {
        try {
            const query = db.select()
                .from(todos)
                .where(eq(todos.id, id))
                .limit(1);

            const [todo] = await this.executeWithInstrumentation(
                query,
                () => query.execute(),
                'db.select'
            );

            return todo;
        } catch (err) {
            this.crashReporterService.report(err);
            throw err;
        }
    }

    async getAllTodos(): Promise<Todo[]> {
        try {
            const query = db.select().from(todos);

            const data = await this.executeWithInstrumentation(
                query,
                async () => await query.execute(),
                'db.select.all'
            );

            return data;
        } catch (err) {
            this.crashReporterService.report(err);
            throw err;
        }
    }

    async updateTodo(id: number, input: Partial<TodoInsert>): Promise<Todo> {
        try {
            const query = db.update(todos)
                .set(input)
                .where(eq(todos.id, id))
                .returning();

            const [updated] = await this.executeWithInstrumentation(
                query,
                () => query.execute(),
                'db.update'
            );

            if (!updated) {
                throw new DatabaseOperationError('Cannot update todo');
            }

            return updated;
        } catch (err) {
            this.crashReporterService.report(err);
            throw err;
        }
    }

    async deleteTodo(id: number, tx?: Transaction): Promise<void> {
        const invoker = tx ?? db;
        try {
            const query = invoker.delete(todos)
                .where(eq(todos.id, id))
                .returning();

            const result = await this.executeWithInstrumentation(
                query,
                () => query.execute(),
                'db.delete'
            );

            if (!result.length) {
                throw new DatabaseOperationError('Cannot delete todo');
            }
        } catch (err) {
            this.crashReporterService.report(err);
            throw err;
        }
    }
}