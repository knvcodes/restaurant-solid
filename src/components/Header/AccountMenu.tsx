import { createEffect, createSignal, Show } from "solid-js";
import { handleLogout, userStore } from "../../store/userStore";
import { restaurant_placeholder } from "../../assets/assets";
import { FaSolidCircleUser } from "solid-icons/fa";
import { useLocation } from "@solidjs/router";

interface AccountMenuProps {}

export function AccountMenu(props: AccountMenuProps) {
  const location = useLocation();

  const [isMenuOpen, setisMenuOpen] = createSignal(false);
  const [bgClass, setbgClass] = createSignal("bg-gray-800/80");

  // dynamic styling
  createEffect(() => {
    const pathname = location.pathname;

    if (pathname == "/") {
      setbgClass("bg-gray-800/60 hover:bg-gray-700/60");
    } else {
      setbgClass("bg-white/80 hover:bg-gray-100/80");
    }
  });

  return (
    <div class="min-w-[var(--account-menu-min-w)]">
      <div
        class="horizontal-list gap-4 items-center cursor-pointer relative"
        onclick={() => setisMenuOpen((p) => !p)}
      >
        <Show
          when={userStore.avatar}
          fallback={<FaSolidCircleUser font-size="20" />}
        >
          <img
            src={userStore.avatar ?? restaurant_placeholder}
            alt=""
            referrerpolicy="no-referrer" // Key fix!
            width={40}
            height={40}
            class="rounded-full"
          />
        </Show>
        <div>{userStore.name}</div>
      </div>
      <Show when={isMenuOpen()}>
        <div class={`account-menu ${bgClass()}`}>
          <div onclick={handleLogout}>Logout</div>
        </div>
      </Show>
    </div>
  );
}
