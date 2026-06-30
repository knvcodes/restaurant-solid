import { useLocation, useNavigate } from "@solidjs/router";
import { AiOutlineClose } from "solid-icons/ai";
import { createMemo, Setter, Show } from "solid-js";

interface SideMenuProps {
  open: boolean;
  setburgerMenuOpen: Setter<boolean>;
}

export function SideMenu(props: SideMenuProps) {
  const { setburgerMenuOpen } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const goto = (locationString: string) => {
    navigate(locationString);
    setburgerMenuOpen(false);
  };

  // logic to change font of header
  // Determine classes based on route
  const textColor = createMemo(() => {
    if (
      location.pathname == "/" ||
      location.pathname.includes("/resetPassword")
    ) {
      return "text-white gradient-glass-dark";
    } else {
      return "text-black gradient-glass";
    }
  });

  return (
    <Show when={props.open}>
      <div class={`side-menu ${textColor()}`}>
        <AiOutlineClose
          font-size="20"
          class="ml-auto h-16"
          onclick={() => setburgerMenuOpen(false)}
        />
        <div class="verticle-list gap-4">
          <div class="side-item" onclick={() => goto("/restaurants")}>
            Restaurants
          </div>
          <div class="side-item" onclick={() => goto("/settings")}>
            Settings
          </div>
        </div>
      </div>
    </Show>
  );
}
