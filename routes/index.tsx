import type { LatestInfo } from "xmvideoplayer/utils/cache.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
// import FreshExample from '../components/fresh_standard/FreshExample.tsx'
// import FreshShowcase from '../components/fresh_standard/FreshShowcase.tsx'
import LemonDrop from "../islands/LemonDrop.tsx";
// import FreshGettingStarted from '../islands/FreshGettingStarted.tsx'
import FreshIntro from '../components/fresh_standard/FreshIntro.tsx'
import Footer from "../components/Footer.tsx";
import VERSIONS from "../versions.json" assert { type: "json" };


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
    const latest = await cache?.loadCache();
    // // MOCK
    // const latest = {
    //   version: "v0.4.10",
    //   notes: "See the assets to download this version and install.",
    //   pub_date: "2022-11-04T16:25:49Z",
    //   platforms: {
    //     appimage: {
    //       name: "xm-video-player_0.4.10_amd64.AppImage.tar.gz",
    //       api_url:
    //         "https://api.github.com/repos/singcl/XmVideoPlayer/releases/assets/83465434",
    //       url:
    //         "https://github.com/singcl/XmVideoPlayer/releases/download/v0.4.10/xm-video-player_0.4.10_amd64.AppIm...",
    //       signature:
    //         "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVUUmZTY1k4WXVYMUpYc0RBT3Q3VXc2...",
    //       content_type: "application/zip",
    //       size: 73.9,
    //     },
    //     deb: {
    //       name: "xm-video-player_0.4.10_amd64.deb",
    //       api_url:
    //         "https://api.github.com/repos/singcl/XmVideoPlayer/releases/assets/83465428",
    //       url:
    //         "https://github.com/singcl/XmVideoPlayer/releases/download/v0.4.10/xm-video-player_0.4.10_amd64.deb",
    //       signature: "",
    //       content_type: "application/zip",
    //       size: 8.1,
    //     },
    //     darwin: {
    //       name: "XmVideoPlayer.app.tar.gz",
    //       api_url:
    //         "https://api.github.com/repos/singcl/XmVideoPlayer/releases/assets/83465738",
    //       url:
    //         "https://github.com/singcl/XmVideoPlayer/releases/download/v0.4.10/XmVideoPlayer.app.tar.gz",
    //       signature:
    //         "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVUUmZTY1k4WXVYMUFGRldLZ0dWSFRI...",
    //       content_type: "application/zip",
    //       size: 5.9,
    //     },
    //     dmg: {
    //       name: "XmVideoPlayer_0.4.10_x64.dmg",
    //       api_url:
    //         "https://api.github.com/repos/singcl/XmVideoPlayer/releases/assets/83465737",
    //       url:
    //         "https://github.com/singcl/XmVideoPlayer/releases/download/v0.4.10/XmVideoPlayer_0.4.10_x64.dmg",
    //       signature: "",
    //       content_type: "application/zip",
    //       size: 5.3,
    //     },
    //     win64: {
    //       name: "XmVideoPlayer_0.4.10_x64_en-US.msi.zip",
    //       api_url:
    //         "https://api.github.com/repos/singcl/XmVideoPlayer/releases/assets/83465721",
    //       url:
    //         "https://github.com/singcl/XmVideoPlayer/releases/download/v0.4.10/XmVideoPlayer_0.4.10_x64_en-US.msi...",
    //       signature:
    //         "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVUUmZTY1k4WXVYMUJoZS9BTnB5bGpF...",
    //       content_type: "application/zip",
    //       size: 5.2,
    //     },
    //   },
    // };
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

// Component Route
const DESCRIPTION =
  "XmVideoPlayer支持m3u8,flv,mpeg-dash等多种流媒体格式🔥<https://github.com/singcl> powered by Deno, Fresh framework";

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
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url.href} />
        <meta property="og:image" content={ogImageUrl} />
      </Head>
      <div class="flex flex-col min-h-screen">
        <Announcement {...props.data} />
        <Hero {...props.data} />
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

interface AnnouncementProps {
  account?: string;
  repository?: string;
  date?: string;
  version?: string;
  github: string;
}
function Announcement(
  { account, repository, version, github }: AnnouncementProps,
) {
  return (
    <a
      class="bg-green-400 text-black border(b green-500) p-3 text-center group"
      href={github}
    >
      <b>{`${account}/${repository}@${version}`}</b>
      &nbsp;has been released!&nbsp;
      <span class="group-hover:underline">→</span>
    </a>
  );
}

interface HeroProps {
  allReleases: string;
  files?: LatestInfo["platforms"];
}
function Hero({ allReleases, files }: HeroProps) {
  if (!files) return null;
  return (
    <>
      <div class="flex justify-end items-center bg-green-300">
        <a
          href={allReleases}
          class="border(1 black) inline-flex items-center h-10 px-4 m-4 text-black bg-transparent rounded hover:bg-white"
        >
          All Releases
        </a>
      </div>
      <section class="w-full flex justify-center items-center bg-green-300 pb-7">
        <div class="text-center max-w-screen-md mx-auto px-4 sm:px-6 md:px-8 space-y-2">
          {Object.entries(files).map(([key, info]) => {
            return (
              <div key={key} class="grid grid-cols-2 md:grid-cols-2 gap-1 md:gap-6">
                <div>
                  {key}:&nbsp;<span>
                    <a href={info.url} className="text-yellow-600">/latest/{key}</a>
                  </span>
                </div>
                <div className="text-gray-600">{info.size} MB</div>
              </div>
            );
          })}
        </div>
      </section>

      <section class="w-full flex justify-center items-center flex-col bg-green-300">
        <LemonDrop />
      </section>
    </>
  );
}








