const Spinner = (props: { class?: string; size?: number }) => (
  <div class="w-full flex">
    <div
      class={`
      mx-auto
      inline-block
      animate-spin
      rounded-full
      border-[3px]
      border-gray-200
      border-t-blue-500
      border-r-transparent
      ${props.class || ""}
      `}
      style={{
        width: props.size ? `${props.size}px` : "24px",
        height: props.size ? `${props.size}px` : "24px",
      }}
    />
  </div>
);

export default Spinner;
