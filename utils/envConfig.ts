export default function getEnvConfig () {
  const intervalStr = Deno.env.get("INTERVAL");
  const account = Deno.env.get("ACCOUNT");
  const repository = Deno.env.get("REPOSITORY");
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
  return config;
}
