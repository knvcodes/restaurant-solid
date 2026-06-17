export function CloseIcon(props: {
  size?: number;
  classes?: string;
  onClick: () => void;
}) {
  const { onClick, classes, size } = props;

  return (
    <svg
      onclick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={classes}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
