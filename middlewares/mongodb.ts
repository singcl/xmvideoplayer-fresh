import type { MiddlewareHandlerContext } from "$fresh/server.ts";
import { DbClient } from "xmvideoplayer/internal/mongodb/db.ts";
import type { DdConfigOptions } from "xmvideoplayer/internal/mongodb/db.ts";

// CTX T添加 db
export function mongodb(options: DdConfigOptions) {
  const db = DbClient.create(options);
  return async (_req: Request, ctx: MiddlewareHandlerContext) => {
    ctx.state.mongodb = db;
    return await ctx.next();
  };
}
