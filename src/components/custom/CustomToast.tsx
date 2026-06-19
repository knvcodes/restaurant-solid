// components/CustomToast.tsx
import { Show } from "solid-js";
import { CloseIcon } from "../icons/Close";
import { toastActions, toastStore } from "../../store/toastStore";

export function CustomToast() {
  return (
    <Show when={toastStore.isOpen}>
      <div class="toast gradient-glass">
        <div class="label">{toastStore.title}</div>
        <hr class="my-2" />
        <div class="font-semibold">{toastStore.message}</div>
      </div>
    </Show>
  );
}
