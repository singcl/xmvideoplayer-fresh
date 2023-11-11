import { defineLayout } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

// Component Route
const DESCRIPTION =
  "XmVideoPlayer支持m3u8,flv,mpeg-dash等多种流媒体格式🔥<https://github.com/singcl> powered by Deno, Fresh framework";

export default defineLayout((req, ctx) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <title>XmVideoPlayer</title>
        <meta
          name="keywords"
          content="XmVideoPlayer,mp4,m3u8,mpeg-dash,video"
        />
      </Head>
      <ctx.Component />
    </>
  );
});
