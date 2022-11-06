import type { LatestInfo } from "xmvideoplayer/utils/cache.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import LemonDrop from "../islands/LemonDrop.tsx";
import Footer from "../components/Footer.tsx";
import VERSIONS from "../versions.json" assert { type: "json" };
import * as FeatureIcons from "../components/FeatureIcons.tsx";
import CopyArea from "../islands/CopyArea.tsx";
import * as Icons from "../components/Icons.tsx";
import Projects from "../components/Projects.tsx";
import projects from "../data/showcase.json" assert { type: "json" };
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
  const origin = `${props.url.protocol}//${props.url.host}`;
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
          <Intro />
          <GettingStarted origin={origin} />
          {/* <Example /> */}
          {/* <Showcase /> */}
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

function Features() {
  const item = "flex md:flex-col items-center gap-5";
  const desc = "flex-1 md:text-center";

  return (
    <div class="grid md:grid-cols-3 gap-6 md:gap-14">
      <div class={item}>
        <FeatureIcons.Globe />
        <div class={desc}>
          <b>Just-in-time rendering</b> on the edge.
        </div>
      </div>

      <div class={item}>
        <FeatureIcons.Island />
        <div class={desc}>
          <b>Island based client hydration</b> for maximum interactivity.
        </div>
      </div>

      <div class={item}>
        <FeatureIcons.LightWeight />
        <div class={desc}>
          <b>Zero runtime overhead</b>: no JS is shipped to the client by
          default.
        </div>
      </div>

      <div class={item}>
        <FeatureIcons.NoBuild />
        <div class={desc}>
          <b>No build step</b>.
        </div>
      </div>

      <div class={item}>
        <FeatureIcons.Gabage />
        <div class={desc}>
          <b>No configuration</b> necessary.
        </div>
      </div>

      <div class={item}>
        <FeatureIcons.TypeScript />
        <div class={desc}>
          <b>TypeScript support</b> out of the box.
        </div>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section class="max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-12">
      <div class="md:flex items-center">
        <div class="flex-1 text-center md:text-left">
          <h2 class="py-2 text(5xl sm:5xl lg:5xl gray-900) sm:tracking-tight sm:leading-[1.1]! font-extrabold">
           <span class="text-green-500">XmVideoPlayer</span> Desktop App.
          </h2>

          <p class="mt-4 text-gray-600">
          XmVideoPlayer支持m3u8,flv,mpeg-dash等多种流媒体格式高颜值的桌面客户端.
          </p>
        </div>

        <picture class="block mt-4 md:mt-0">
          <img
            src="/illustration/lemon-squash.svg"
            class="w-80 mx-auto"
            width={800}
            height={678}
            alt="deno is drinking fresh lemon squash"
          />
        </picture>
      </div>

      <Features />

      <p class="text-gray-600">
        Fresh embraces the tried and true design of server side rendering and
        progressive enhancement on the client side.
      </p>
    </section>
  );
}

function GettingStarted(props: { origin: string }) {
  return (
    <section class="max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-4">
      <h2 id="getting-started" class="text(3xl gray-600) font-bold">
        <a href="#getting-started" class="hover:underline">
          Getting Started
        </a>
      </h2>
      <div class="text-gray-600 flex gap-1 mb-4 bg-gray-100 p-2 rounded">
        <div class="text-gray-400">
          <Icons.Info />
        </div>
        <p>
          <a href="https://deno.land" class="text-blue-600 hover:underline">
            Deno CLI
          </a>{" "}
          version 1.25.0 or higher is required.{" "}
          <a
            href="https://deno.land/manual/getting_started/installation"
            class="text-blue-600 hover:underline"
          >
            Install
          </a>{" "}
          or{" "}
          <a
            href="https://deno.land/manual/getting_started/installation#updating"
            class="text-blue-600 hover:underline"
          >
            update
          </a>.
        </p>
      </div>
      <p class="text-gray-600">
        To bootstrap a new project:
      </p>

      <CopyArea>
        {`deno run -A -r ${props.origin} my-project`}
      </CopyArea>

      <p class="text-gray-600">
        Enter the newly created project directory and run the following command
        to start the development server:
      </p>

      <CopyArea>{`deno task start`}</CopyArea>

      <p class="text-gray-600">
        You can now open{" "}
        <a
          href="http://localhost:8000"
          class="text-blue-600 hover:underline"
        >
          http://localhost:8000
        </a>{" "}
        in your browser to view the page.
      </p>
      <p class="text-gray-600">
        A more in-depth{" "}
        <a
          href="/docs/getting-started"
          class="text-blue-600 hover:underline"
        >
          <i>Getting Started</i>
        </a>{" "}
        guide is available in{" "}
        <a href="/docs" class="text-blue-600 hover:underline">the docs</a>.
      </p>
    </section>
  );
}

const timeFmt = new Intl.DateTimeFormat("en-US", {
  timeStyle: "long",
  hour12: false,
});

function Example() {
  return (
    <section class="max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-4">
      <h2 id="example" class="text(3xl gray-600) font-bold">
        <a href="#example" class="hover:underline">
          Example
        </a>
      </h2>
      <p class="text-gray-600">
        This text is being server side rendered on the fly. It was rendered at
        {" "}
        {timeFmt.format(new Date())}.
      </p>
      <p class="text-gray-600">
        The counter below was rendered on the server with a starting value of 3,
        and was then hydrated on the client to provide interactivity. Try out
        the buttons!
      </p>
      <Counter start={3} />
      <p class="text-gray-600">
        Only the JS required to render that counter is sent to the client.
      </p>
    </section>
  );
}

function Showcase() {
  return (
    <section class="max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-4">
      <h2 id="showcase" class="text(3xl gray-600) font-bold">
        <a href="#showcase" class="hover:underline">
          Showcase
        </a>
      </h2>
      <p class="text-gray-600">
        Below is a selection of projects that have been built with Fresh.
      </p>
      <Projects items={projects.slice(0, 3)} class="gap-8" />
      <div class="flex gap-2 items-center justify-end text-blue-600">
        <Icons.ArrowRight />
        <a href="./showcase" class="hover:underline focus:underline">
          View more
        </a>
      </div>
    </section>
  );
}
