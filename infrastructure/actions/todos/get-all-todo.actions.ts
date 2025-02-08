'use server'

import { getInjection } from "@/di/container";

export const getTodos = async () => {
    const instrumentationService = getInjection('IInstrumentationService');
    return await instrumentationService.startSpan(
        {
            name: 'getTodos',
            op: 'function.nextjs',
        },
        async () => {
            try {
                const getAllTodosController = getInjection(
                    'IGetAllTodosController'
                );
                return await getAllTodosController();
            } catch (err) {

                const crashReporterService = getInjection('ICrashReporterService');
                crashReporterService.report(err);
                throw err;
            }
        }
    );
}