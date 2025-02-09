import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';

import { createContainer } from '@evyweb/ioctopus';
import { createMonitoringModule } from './modules/monitoring.module';
import { createTodosModules } from './modules/todo.module';

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('MonitoringModule'), createMonitoringModule());
ApplicationContainer.load(Symbol("TodosModule"), createTodosModules());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}