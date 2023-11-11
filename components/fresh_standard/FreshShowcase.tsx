import Projects from "../../components/Projects.tsx";
import projects from "../../data/showcase.json" assert { type: "json" };
import * as Icons from "../../components/Icons.tsx";

export default function Showcase() {
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
