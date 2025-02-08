'use server'

import { TodoInsert } from "@/src/entities/models/todo.model";
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
                const createTodoController = getInjection(
                    'ICreateTodoController'
                );

                const todoData: TodoInsert = {
                    text: data.text,
                    done: false
                };

                revalidatePath('/');
                return await createTodoController(todoData);
            } catch (err) {

                const crashReporterService = getInjection('ICrashReporterService');
                crashReporterService.report(err);
                throw err;
            }
        }
    );
}