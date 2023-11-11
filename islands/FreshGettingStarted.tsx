import CopyArea from "./CopyArea.tsx";
import * as Icons from "../components/Icons.tsx";

export default function GettingStarted(props: { origin: string }) {
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
          </a>
          .
        </p>
      </div>
      <p class="text-gray-600">To bootstrap a new project:</p>

      <CopyArea>{`deno run -A -r ${props.origin} my-project`}</CopyArea>

      <p class="text-gray-600">
        Enter the newly created project directory and run the following command
        to start the development server:
      </p>

      <CopyArea>{`deno task start`}</CopyArea>

      <p class="text-gray-600">
        You can now open{" "}
        <a href="http://localhost:8000" class="text-blue-600 hover:underline">
          http://localhost:8000
        </a>{" "}
        in your browser to view the page.
      </p>
      <p class="text-gray-600">
        A more in-depth{" "}
        <a href="/docs/getting-started" class="text-blue-600 hover:underline">
          <i>Getting Started</i>
        </a>{" "}
        guide is available in{" "}
        <a href="/docs" class="text-blue-600 hover:underline">
          the docs
        </a>
        .
      </p>
    </section>
  );
}
