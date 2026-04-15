export class ApplicationException extends Error {
  public code = "APPLICATION_ERROR";
  public error: unknown;
  public statusCode: number;

  constructor(message: string, error: unknown = null, statusCode = 400) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }
}
