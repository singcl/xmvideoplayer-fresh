import { MiddlewareHandlerContext } from "$fresh/server.ts";
import Cache from "xmvideoplayer/utils/cache.ts";
import getEnvConfig from "xmvideoplayer/utils/envConfig.ts";

interface State {
  xmApplication: string;
  cache: null | Cache;
}

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
        return new Response(
          JSON.stringify({
            error: cause,
            message,
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 400,
          }
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

//
export const handler = [cacheHandler()];
