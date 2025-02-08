import { CrashReporterService } from '@/infrastructure/services/crash-reporter.service';
import { DI_SYMBOLS } from '@/di/types';
import { InstrumentationService } from '@/infrastructure/services/instrumentation.service';
import { createModule } from '@evyweb/ioctopus';

export function createMonitoringModule() {
  const monitoringModule = createModule();

  monitoringModule
    .bind(DI_SYMBOLS.IInstrumentationService)
    .toClass(InstrumentationService);
  monitoringModule
    .bind(DI_SYMBOLS.ICrashReporterService)
    .toClass(CrashReporterService);

  return monitoringModule;
}
