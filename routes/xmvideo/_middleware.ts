import { MiddlewareHandlerContext } from "$fresh/server.ts";
import Cache from "../../utils/cache.ts";

interface State {
  xmApplication: string;
  cache: null | Cache;
}

// interface EnvConfig {
//   interval?: number;
//   account?: string;
//   repository?: string;
//   token?: string;
//   url?: string;
//   pre?: string;
// }

function cacheHandler() {
  const intervalStr = Deno.env.get("INTERVAL");
  const account = Deno.env.get("ACCOUNT"); // || 'singcl';
  const repository = Deno.env.get("REPOSITORY"); // || 'XmVideoPlayer';
  const pre = Deno.env.get("PRE");
  const token = Deno.env.get("TOKEN");
  const PRIVATE_BASE_URL = Deno.env.get("PRIVATE_BASE_URL");
  const FRESH_URL = Deno.env.get("FRESH_URL");
  const url = FRESH_URL || PRIVATE_BASE_URL;
  //
  const config = {
    interval: intervalStr ? Number(intervalStr) : undefined,
    account,
    repository,
    token,
    url,
    pre,
  };

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
