import { /* Handlers, */ HandlerContext } from "$fresh/server.ts";
import * as semver from "$std/semver/mod.ts";
import checkAlias from "../../../../utils/aliases.ts";

interface RequestParams extends Record<string, string> {
  version: string;
  platform: string;
}

export const handler = (req: Request, ctx: HandlerContext): Response => {
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

  return new Response(
    JSON.stringify({
      id: uuid,
      version,
      platform,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
