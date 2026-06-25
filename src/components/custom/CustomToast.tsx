// components/CustomToast.tsx
import { For, Show } from "solid-js";
import { toastStore } from "../../store/toastStore";

export function CustomToast() {
  return (
    <>
      <Show when={toastStore.toasts.length > 0}>
        <div class="verticle-list gap-4 toast-container">
          <For each={toastStore.toasts}>
            {(toastItem) => (
              <>
                <div class="gradient-glass toast">
                  <div class="label">{toastItem.title}</div>
                  <hr class="my-2" />
                  <div class="font-semibold">{toastItem.message}</div>
                </div>
              </>
            )}
          </For>
        </div>
      </Show>
    </>
  );
}
