import { createEffect, createSignal, Show } from "solid-js";
import { userStore } from "../../store/userStore";
import { restaurant_placeholder } from "../../assets/assets";
import { FaSolidCircleUser } from "solid-icons/fa";

interface AccountMenuProps {}

export function AccountMenu(props: AccountMenuProps) {
  const [isMenuOpen, setisMenuOpen] = createSignal(false);

  return (
    <div class="horizontal-list gap-4 items-center cursor-pointer">
      <Show
        when={userStore.avatar}
        fallback={<FaSolidCircleUser font-size="30" />}
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
  );
}
