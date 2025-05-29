import { ApiStatus } from "./rest";

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
