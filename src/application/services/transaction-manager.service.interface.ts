export interface ITransactionManagerService {
  startTransaction<T>(
    clb: (tx: any) => Promise<T>
  ): Promise<T>;
}