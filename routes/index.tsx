import type { LatestInfo } from "xmvideoplayer/utils/cache.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
// import FreshExample from '../components/fresh_standard/FreshExample.tsx'
// import FreshShowcase from '../components/fresh_standard/FreshShowcase.tsx'
// import FreshGettingStarted from '../islands/FreshGettingStarted.tsx'
import FreshIntro from '../components/fresh_standard/FreshIntro.tsx'
import FreshAnnouncement from '../components/fresh_standard/FreshAnnouncement.tsx'
import FreshHero from '../components/fresh_standard/FreshHero.tsx'
import Footer from "../components/Footer.tsx";
import VERSIONS from "../versions.json" assert { type: "json" };
import V_UPDATE from "../data/update.json" assert { type: "json" };


import type { State } from "./_middleware.ts";

interface IDetails {
  account?: string;
  repository?: string;
  date?: string;
  files?: LatestInfo["platforms"];
  version?: string;
  releaseNotes: string;
  allReleases: string;
  github: string;
  title: string;
}

// Handler Route
export const handler: Handlers<IDetails, State> = {
  async GET(req, ctx) {
    const { cache, configs } = ctx.state;
    const accept = req.headers.get("accept");
    if (accept && !accept.includes("text/html")) {
      const path = `https://deno.land/x/fresh@${VERSIONS[0]}/init.ts`;
      return new Response(`Redirecting to ${path}`, {
        headers: { "Location": path },
        status: 307,
      });
    }
    // 调用github API 可能导致页面加载缓慢
    // const latest = await cache?.loadCache();
    // MOCK
    const latest = V_UPDATE
    const details = {
      account: configs.account,
      repository: configs.repository,
      date: latest?.pub_date,
      files: latest?.platforms,
      version: latest?.version,
      releaseNotes:
        `https://github.com/${configs.account}/${configs.repository}/releases/tag/${latest?.version}`,
      allReleases:
        `https://github.com/${configs.account}/${configs.repository}/releases`,
      github: `https://github.com/${configs.account}/${configs.repository}`,
      title:
        `XmVideoPlayer支持m3u8,flv,mpeg-dash等多种流媒体格式高颜值的桌面客户端-${configs.account}/${configs.repository}`,
    };
    return ctx.render(details);
  },
};



export default function MainPage(props: PageProps<IDetails>) {
  const ogImageUrl = new URL(asset("/home-og.png"), props.url).href;
  // const origin = `${props.url.protocol}//${props.url.host}`;
  //
  const { title } = props.data;
  //
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={props.url.href} />
        <meta property="og:image" content={ogImageUrl} />
      </Head>
      <div class="flex flex-col min-h-screen">
        <FreshAnnouncement {...props.data} />
        <FreshHero {...props.data} />
        <div class="flex-1">
          <FreshIntro />
          {/* <FreshGettingStarted origin={origin} /> */}
          {/* <FreshExample /> */}
          {/* <FreshShowcase /> */}
        </div>
        <Footer />
      </div>
    </>
  );
}











