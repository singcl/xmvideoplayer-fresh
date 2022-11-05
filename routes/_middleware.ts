import type { MiddlewareHandlerContext } from "$fresh/server.ts";
import resJson from "xmvideoplayer/utils/resJson.ts";
export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<unknown>
) {
  Object.defineProperty(ctx, "json", {
    value: resJson,
    configurable: false,
    writable: false,
    enumerable: true,
  });
  return await ctx.next();
}
