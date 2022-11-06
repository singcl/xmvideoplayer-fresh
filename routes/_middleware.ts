import type { MiddlewareHandlerContext } from "$fresh/server.ts";
import getLogger from "$logging/index.ts";
import resJson from "xmvideoplayer/utils/resJson.ts";
import Cache from "xmvideoplayer/utils/cache.ts";
import getEnvConfig from "xmvideoplayer/utils/envConfig.ts";

export interface State {
  xmApplication: string;
  cache: null | Cache;
}

// CTX T添加json方法
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

// 所有请求共享同一个cache实例
function cacheHandler() {
  const config = getEnvConfig();
  //
  let cache: null | Cache = null;
  try {
    cache = new Cache(config);
  } catch (err) {
    const { cause, message } = err;
    if (cause) {
      return function () {
        return resJson(
          {
            error: cause,
            message,
          },
          400
        );
      };
    }
    throw err;
  }

  //
  return async function (_req: Request, ctx: MiddlewareHandlerContext<State>) {
    ctx.state.xmApplication = "XmVideoPlayer";
    // 所有请求共享同一个cache实例
    ctx.state.cache = cache;
    const resp = await ctx.next();
    resp.headers.set("server", "fresh server");
    return resp;
  };
}

export const handler = [getLogger(), jsonHandler, cacheHandler()];
