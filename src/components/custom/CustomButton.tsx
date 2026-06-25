import { Button } from "@kobalte/core/button";
import { Show } from "solid-js";
import Spinner from "../loaders/Spinner";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  classes?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export function CustomButton(props: ButtonProps) {
  const { label = "Default", onClick, classes = "w-full button-y" } = props;
  return (
    <Button
      class={`${classes} ${props.disabled && "opacity-50"}`}
      onclick={onClick}
      disabled={props.disabled || props.isLoading}
    >
      <Show when={props.isLoading} fallback={label}>
        <Spinner />
      </Show>
    </Button>
  );
}
