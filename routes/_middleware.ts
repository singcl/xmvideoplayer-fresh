import type { MiddlewareHandlerContext } from "$fresh/server.ts";
import getLogger from "$logging/index.ts";
import resJson from "xmvideoplayer/utils/resJson.ts";

async function jsonHandler(
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

export const handler = [getLogger(), jsonHandler];
