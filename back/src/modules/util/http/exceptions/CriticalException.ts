export class CriticalException extends Error {
  public code = "CRITICAL_ERROR";
  public error: unknown;

  constructor(message: string, error: unknown = null) {
    super(message);
    this.error = error;
  }
}
