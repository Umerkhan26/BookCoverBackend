// errorResponse.ts

export interface ErrorResponse {
    message: string;
    statusCode: number;
    stack?: string;
  }
  
  /**
   * Factory function to create an error response object.
   * @param message - The error message.
   * @param statusCode - The HTTP status code associated with the error.
   * @returns An error response object.
   */
  export const createErrorResponse = (message: string, statusCode: number): ErrorResponse => {
    const errorResponse: ErrorResponse = { message, statusCode };
  
    // Capture stack trace if needed
    if (Error.captureStackTrace) {
      Error.captureStackTrace(errorResponse, createErrorResponse);
      errorResponse.stack = errorResponse.stack || "";
    }
  
    return errorResponse;
  };
  