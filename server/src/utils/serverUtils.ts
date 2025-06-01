export enum ApiStatus {
  Success = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  Conflict = 409,
  UnprocessableContent = 422,
  ServerError = 500,
}

export type ApiResponse<T> = { success: boolean; message?: string; errors?: Error; data?: T };
export type ApiBody<T> = T | undefined | ApiResponse<T>;
export type GenerateHTTPRespReturn = ReturnType<typeof generateHTTPResponse>;
export type HTTPResponse = { headers?: object; statusCode: number; body: string };

export const generateHTTPResponse = <T>(statusCode: ApiStatus, body: ApiBody<T>): HTTPResponse => {
  return {
    headers: {},
    statusCode: +statusCode || ApiStatus.Success,
    body: JSON.stringify(body),
  };
};

export const generateHTTPError = (message: string, errors?: Error): HTTPResponse =>
  generateHTTPResponse<undefined>(ApiStatus.BadRequest, {
    success: false,
    errors: errors ?? new Error(message),
    message,
  });

export function generateHTTPSuccess<T>(body: T): HTTPResponse {
  return generateHTTPResponse(ApiStatus.Success, body);
}

export class HttpResponse<T> {
  public readonly success: boolean;

  constructor(
    public readonly statusCode: ApiStatus,
    public readonly data?: T,
  ) {
    this.success = statusCode >= ApiStatus.Success && statusCode < ApiStatus.BadRequest;
  }

  public toJsonResponse(): unknown {
    return {
      statusCode: this.statusCode,
      body: this.buildBody(this.data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  public static Ok<T>(data?: T): HttpResponse<T> {
    return new HttpResponse<T>(ApiStatus.Success, data);
  }

  public static Created<T>(data?: T): HttpResponse<T> {
    return new HttpResponse(ApiStatus.Created, data);
  }

  public static Error<T>(data?: T): HttpResponse<T> {
    return new HttpResponse(ApiStatus.BadRequest, data);
  }

  private buildBody(data?: T): string {
    return JSON.stringify(
      this.success
        ? {
            success: this.success,
            ...(data !== undefined ? { data } : {}),
          }
        : {
            success: this.success,
            error: { message: data },
          },
    );
  }
}

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(ApiStatus.BadRequest, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(ApiStatus.Unauthorized, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(ApiStatus.NotFound, message);
  }
}

export class UnprocessableContentError extends HttpError {
  constructor(message: string) {
    super(ApiStatus.UnprocessableContent, message);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(ApiStatus.Conflict, message);
  }
}
