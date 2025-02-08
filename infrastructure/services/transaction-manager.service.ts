import { ITransactionManagerService } from '@/src/application/services/transaction-manager.service.interface';
import { db } from '@/db/drizzle';

export class TransactionManagerService implements ITransactionManagerService {
  public async startTransaction<T>(
    clb: (tx: any) => Promise<T>,
  ): Promise<T> {
    // Simplemente ejecutamos el callback sin transacción
    return clb(db);
  }
}