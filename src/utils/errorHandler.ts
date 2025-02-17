class ErrorHandler extends Error {
    public statusCode: number;
    public message: string;
    public errors?: any;
    public stackTrace?: string;
  
    constructor(statusCode: number, message: string, errors?: any) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.errors = errors;
      
      // Capture the stack trace for debugging
      if (process.env.NODE_ENV !== 'production') {
        this.stackTrace = this.stack;
      }
  
      // Ensure prototype chain is properly maintained
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  export default ErrorHandler;
  