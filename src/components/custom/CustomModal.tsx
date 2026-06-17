import { Button } from "@kobalte/core/button";
import { JSX, Show } from "solid-js";
import { CloseIcon } from "../icons/Close";

interface CustomModalProps {
  title: string;
  description?: string;
  leftBtnText?: string;
  rightBtnText: string;
  rightBtnFn: () => void;
  leftBtnFn?: () => void;
  onClose: () => void;
  children?: JSX.Element;
}

export function CustomModal(props: CustomModalProps) {
  const {
    title,
    description,
    leftBtnText,
    rightBtnText,
    rightBtnFn,
    leftBtnFn = () => {},
    onClose = () => {},
    children,
  } = props;
  return (
    <div class="modal-overlay flex-center">
      <div class="modal">
        <div class="flex justify-between items-center">
          <div class="heading-3">{title}</div>
          <CloseIcon
            size={20}
            classes="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          />
        </div>
        <hr class="my-2" />
        <Show when={children} fallback={<div>{description}</div>}>
          {children}
        </Show>
        <Show when={leftBtnText}>
          <Button class="w-full button-y" onclick={leftBtnFn}>
            {leftBtnText}
          </Button>
        </Show>
        <Button class="w-full button-y" onclick={rightBtnFn}>
          {rightBtnText}
        </Button>
      </div>
    </div>
  );
}
