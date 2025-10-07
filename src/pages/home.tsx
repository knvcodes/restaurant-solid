import { createSignal } from "solid-js";
import { Popover } from "@kobalte/core/popover";
import "./style.css";

export default function Home() {
  const [count, setCount] = createSignal(0);

  return (
    <Popover>
      <Popover.Trigger class="popover__trigger">Learn more</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class="popover__content">
          <Popover.Arrow />
          <div class="popover__header">
            <Popover.Title class="popover__title">About Kobalte</Popover.Title>
            <Popover.CloseButton class="popover__close-button"></Popover.CloseButton>
          </div>
          <Popover.Description class="popover__description">
            A UI toolkit for building accessible web apps and design systems
            with SolidJS.
          </Popover.Description>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
