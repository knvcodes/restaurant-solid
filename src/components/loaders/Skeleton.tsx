const Skeleton = (props: { class?: string }) => (
  <div
    class={`animate-pulse !bg-gray-200 !shadow-none card rounded ${props.class || ""}`}
  />
);

export default Skeleton;
