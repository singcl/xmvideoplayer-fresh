#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";

Deno.env.set("ACCOUNT", "singcl");
Deno.env.set("REPOSITORY", "XmVideoPlayer");

await dev(import.meta.url, "./main.ts");
