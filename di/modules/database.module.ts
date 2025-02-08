import { DI_SYMBOLS } from '@/di/types';
import { TransactionManagerService } from '@/infrastructure/services/transaction-manager.service';
import { createModule } from '@evyweb/ioctopus';

export function createTransactionManagerModule() {
  const transactionManagerModule = createModule();

  transactionManagerModule
    .bind(DI_SYMBOLS.ITransactionManagerService)
    .toClass(TransactionManagerService);

  return transactionManagerModule;
}
