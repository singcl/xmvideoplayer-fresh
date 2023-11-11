import type { MiddlewareHandlerContext } from "$fresh/server.ts";
import { DbBuilder } from "xmvideoplayer/mongodb/db.ts";
import type { DdConfigOptions } from "xmvideoplayer/mongodb/db.ts";

// CTX T添加 db
export function mongodb(options: DdConfigOptions) {
  const db = DbBuilder.create(options);
  return async (_req: Request, ctx: MiddlewareHandlerContext) => {
    ctx.state.mongodb = db.client;
    return await ctx.next();
  };
}
