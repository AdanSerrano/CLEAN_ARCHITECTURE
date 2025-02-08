import * as Sentry from '@sentry/nextjs';

import { ICrashReporterService } from '@/src/application/services/crash-reporter.service.interface';

export class CrashReporterService implements ICrashReporterService {
    report(error: any): string {
        console.error('CrashReporterService caught error:', error);
        return Sentry.captureException(error);
    }
}