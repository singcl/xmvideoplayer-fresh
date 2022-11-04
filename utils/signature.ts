// const fetch = require("node-fetch");
import { retryAsync } from "https://deno.land/x/retry@v2.0.0/mod.ts";

export default async function (
  fileName: string,
  assets: { name: string; browser_download_url: string }[]
) {
  // Look if we can find a signature...
  const foundSignature = assets.find(
    (asset) => asset.name === `${fileName}.sig`
  );

  if (!foundSignature) {
    return null;
  }

  const content = await retryAsync(
    async () => {
      const response = await fetch(foundSignature.browser_download_url);

      if (response.status !== 200) {
        throw new Error(
          `GitHub API responded with ${response.status} for url ${foundSignature.browser_download_url}`
        );
      }

      return response.text();
    },
    { maxTry: 3 }
  );

  return content;
}
