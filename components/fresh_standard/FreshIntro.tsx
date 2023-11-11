import * as FeatureIcons from "../FeatureIcons.tsx";

export default function Intro() {
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
