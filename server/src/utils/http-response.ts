import { ApiStatus } from "./rest";

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
