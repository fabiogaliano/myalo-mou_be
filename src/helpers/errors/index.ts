export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    // Set the prototype explicitly as TypeScript doesn't support
    // proper prototype chain for built-in classes
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
