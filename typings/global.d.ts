import type {
  // MiddlewareHandlerContext,
  HandlerContext,
} from "$fresh/server.ts";

declare global {
  // interface MiddlewareHandlerContextX<State = Record<string, unknown>>
  //   extends MiddlewareHandlerContext<State> {
  //   json?(data: unknown, statusCode: number): Response;
  // }

  interface HandlerContextX<Data = unknown, State = Record<string, unknown>>
    extends HandlerContext<Data, State> {
    json?(data: unknown, statusCode: number): Response;
  }
}
