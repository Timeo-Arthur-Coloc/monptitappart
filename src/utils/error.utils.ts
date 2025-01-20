export class AppError extends Error {
  public statusCode: number;
  public errorCode: string;
  public timestamp: string;

  constructor(statusCode: number, errorCode: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();
  }
}