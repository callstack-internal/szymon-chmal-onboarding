export const isRunningInJest: boolean =
  typeof process !== 'undefined' && process.env.JEST_WORKER_ID !== undefined;
