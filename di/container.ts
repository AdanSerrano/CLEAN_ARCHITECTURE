import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';

import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { createContainer } from '@evyweb/ioctopus';
import { createTodosModules } from './modules/todo.module';

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("TodosModule"), createTodosModules());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
    const instrumentationService = ApplicationContainer.get<IInstrumentationService>(DI_SYMBOLS.IInstrumentationService);


    return instrumentationService.startSpan(
        {
            name: '(di) getInjection',
            op: 'function',
            attributes: { symbol: symbol.toString() },
        },
        () => ApplicationContainer.get(DI_SYMBOLS[symbol])
    );
}