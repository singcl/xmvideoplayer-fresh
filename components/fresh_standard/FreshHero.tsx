import type { LatestInfo } from "xmvideoplayer/utils/cache.ts";
import LemonDrop from "../../islands/LemonDrop.tsx";

interface HeroProps {
  allReleases: string;
  files?: LatestInfo["platforms"];
}
export default function Hero({ allReleases, files }: HeroProps) {
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
              <div
                key={key}
                class="grid grid-cols-2 md:grid-cols-2 gap-1 md:gap-6"
              >
                <div>
                  {key}:&nbsp;
                  <span>
                    <a href={info.url} className="text-yellow-600">
                      /latest/{key}
                    </a>
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
