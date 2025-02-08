'use server'

import { getInjection } from "@/di/container";
import { revalidatePath } from "next/cache";

export async function deleteTodo(id?: number) {
    const instrumentationService = getInjection('IInstrumentationService');
    return await instrumentationService.startSpan(
        {
            name: 'deleteTodo',
            op: 'function.nextjs',
        },
        async () => {
            try {
                const deleteTodoController = getInjection(
                    'IDeleteTodoController'
                );

                revalidatePath('/');
                return await deleteTodoController(id!);
            } catch (err) {

                const crashReporterService = getInjection('ICrashReporterService');
                crashReporterService.report(err);
                throw err;
            }
        }
    );
}