const Spinner = (props: { class?: string }) => (
  <div
    class={`animate-spin border-2 border-gray-300 border-t-blue-500 rounded-full ${props.class || ""}`}
  />
);
