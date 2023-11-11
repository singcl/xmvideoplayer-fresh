import Counter from "../../islands/Counter.tsx";
const timeFmt = new Intl.DateTimeFormat("en-US", {
  timeStyle: "long",
  hour12: false,
});

export default function Example() {
  return (
    <section class="max-w-screen-md mx-auto my-16 px(4 sm:6 md:8) space-y-4">
      <h2 id="example" class="text(3xl gray-600) font-bold">
        <a href="#example" class="hover:underline">
          Example
        </a>
      </h2>
      <p class="text-gray-600">
        This text is being server side rendered on the fly. It was rendered at{" "}
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
