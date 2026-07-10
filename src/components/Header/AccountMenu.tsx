import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import { handleLogout, userStore } from "../../store/userStore";
import { restaurant_placeholder } from "../../assets/assets";
import { FaSolidCircleUser } from "solid-icons/fa";
import { useLocation, useNavigate } from "@solidjs/router";

interface AccountMenuProps {}

export function AccountMenu(props: AccountMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setisMenuOpen] = createSignal(false);
  const [bgClass, setbgClass] = createSignal("bg-gray-800/80");

  // dynamic styling
  createEffect(() => {
    const pathname = location.pathname;

    if (pathname == "/") {
      setbgClass("bg-gray-800/60");
    } else {
      setbgClass("bg-white/80");
    }
  });

  const handleProfile = () => {
    navigate("/settings");
    setisMenuOpen(false);
  };

  // Close menu when clicking
  let menuRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (!isMenuOpen() || !menuRef) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef && !menuRef.contains(event.target as Node)) {
        setisMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup listener when effect re-runs or component unmounts
    onCleanup(() => {
      document.removeEventListener("click", handleClickOutside);
    });
  });

  return (
    <div class="min-w-[var(--account-menu-min-w)]" ref={menuRef}>
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
            alt="userProfilePhoto"
            referrerpolicy="no-referrer"
            class="rounded-full w-10 h-10"
          />
        </Show>
        <div>{userStore.name}</div>
      </div>
      <Show when={isMenuOpen()}>
        <div class={`account-menu ${bgClass()}`}>
          <div onclick={handleProfile}>Profile</div>
          <hr />
          <div onclick={handleLogout}>Logout</div>
        </div>
      </Show>
    </div>
  );
}
