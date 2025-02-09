'use server'

import { TodoInsert } from "@/infrastructure/entities/models/todo.model";
import { getInjection } from "@/di/container";
import { revalidatePath } from "next/cache";

export async function createTodo(data: TodoInsert) {
    const instrumentationService = getInjection('IInstrumentationService');
    return await instrumentationService.startSpan(
        {
            name: 'createTodo',
            op: 'function.nextjs',
        },
        async () => {
            try {
                const createTodoController = getInjection('ICreateTodoController');
                revalidatePath('/');
                return await createTodoController(data);
            } catch (err) {
                const crashReporterService = getInjection('ICrashReporterService');
                crashReporterService.report(err);
                throw err;
            }
        }
    );
}