#!/usr/bin/env -S deno run -A --watch=static/,routes/
import dev from "$fresh/dev.ts";

// config in dotenv
// Deno.env.set("ACCOUNT", "");
// Deno.env.set("REPOSITORY", "");

import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";

await dev(import.meta.url, "./main.ts", config);
