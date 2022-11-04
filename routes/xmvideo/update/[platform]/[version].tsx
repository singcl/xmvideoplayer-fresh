import { /* Handlers, */ HandlerContext } from "$fresh/server.ts";
import * as semver from "$std/semver/mod.ts";
import checkAlias from "../../../../utils/aliases.ts";

interface RequestParams extends Record<string, string> {
  version: string;
  platform: string;
}

export const handler = async (
  req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const uuid = crypto.randomUUID();
  const { version, platform: platformName } = ctx.params as RequestParams;

  if (!semver.valid(version)) {
    return new Response(
      JSON.stringify({
        id: uuid,
        error: "version_invalid",
        message: "The specified version is not SemVer-compatible",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const platform = checkAlias(platformName);

  if (!platform) {
    return new Response(
      JSON.stringify({
        id: uuid,
        error: "invalid_platform",
        message: "The specified platform is not valid",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  // Get the latest version from the cache
  const cache = ctx.state.cache;
  const latest = await cache.loadCache();
  console.log("-----cache", latest);

  if (!latest.platforms || !latest.platforms[platform]) {
    return new Response(null, {
      status: 204,
    });
  }

  // Previously, we were checking if the latest version is
  // greater than the one on the client. However, we
  // only need to compare if they're different (even if
  // lower) in order to trigger an update.

  // This allows developers to downgrade their users
  // to a lower version in the case that a major bug happens
  // that will take a long time to fix and release
  // a patch update.

  if (semver.compare(latest.version, version) !== 0) {
    const { notes, pub_date } = latest;

    return new Response(
      JSON.stringify({
        id: uuid,
        name: latest.version,
        notes,
        pub_date,
        signature: latest.platforms[platform].signature,
        url: latest.platforms[platform].url,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  }

  return new Response(null, {
    status: 204,
  });
};
