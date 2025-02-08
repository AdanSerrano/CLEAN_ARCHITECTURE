'use server'

import { Todo } from "@/src/entities/models/todo.model";
import { getInjection } from "@/di/container";
import { revalidatePath } from "next/cache";

export async function updateTodo(data: Partial<Todo>, id?: number) {
    const instrumentationService = getInjection('IInstrumentationService');
    return await instrumentationService.startSpan(
        {
            name: 'updateTodo',
            op: 'function.nextjs',
        },
        async () => {
            try {
                const updateTodoController = getInjection(
                    'IUpdateTodoController'
                );

                revalidatePath('/');
                return await updateTodoController(data, id);
            } catch (err) {
                const crashReporterService = getInjection('ICrashReporterService');
                crashReporterService.report(err);
                throw err;
            }
        }
    );
}