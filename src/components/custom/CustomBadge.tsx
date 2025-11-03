interface BadgeProps {
  label: string;
}

export function CustomBadge(props: BadgeProps) {
  const { label = "Default" } = props;
  return (
    <div class="text-xs px-2 py-2 bg-black text-white font-semibold">
      {label}
    </div>
  );
}
