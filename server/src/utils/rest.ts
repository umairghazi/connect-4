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
