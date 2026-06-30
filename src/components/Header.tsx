import { createEffect, createMemo, createSignal, Show } from "solid-js";
import { Button } from "@kobalte/core/button";
import { useLocation, useNavigate } from "@solidjs/router";
import { openModal } from "../store/modalStore";
import { userStore } from "../store/userStore";
import { AccountMenu } from "./Header/AccountMenu";
import { FaSolidCartShopping } from "solid-icons/fa";
import { VsCircleFilled, VsCircleSmallFilled } from "solid-icons/vs";
import { FiMenu } from "solid-icons/fi";
import { AiOutlineClose } from "solid-icons/ai";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = createSignal(false);
  const [isLoggedIn, setisLoggedIn] = createSignal(false);

  const [burgerMenuOpen, setburgerMenuOpen] = createSignal(false);

  // login account ui logic
  createEffect(() => {
    if (userStore.name == null) {
      setisLoggedIn(false);
    } else {
      setisLoggedIn(true);
    }
  });

  // logic to change font of header
  // Determine classes based on route
  const textColor = createMemo(() => {
    if (
      location.pathname == "/" ||
      location.pathname.includes("/resetPassword")
    ) {
      return "text-white";
    } else {
      return "text-black border-b-1 w-full bg-white/80";
    }
  });

  return (
    <header class={`fixed w-full z-10 ${textColor()}`}>
      <div class="lg:max-w-7xl mx-auto px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 relative">
          {/* Logo on left */}
          <div
            class="flex-shrink-0 text-2xl font-bold cursor-pointer"
            onclick={() => navigate("/")}
          >
            MyBrand
          </div>

          {/* Desktop Nav (centered absolutely) */}
          <nav class="hidden md:flex gap-4">
            <a href="/restaurants" class="hover:text-indigo-600 transition">
              My Restaurants
            </a>
            <a href="settings" class="hover:text-indigo-600 transition">
              Settings
            </a>
          </nav>

          <div class="md:block hidden">
            <Show when={!isLoggedIn()}>
              <Button onclick={() => openModal("login")} class="button-y">
                Log In
              </Button>
            </Show>
          </div>
          <div class="block md:hidden">
            <Show
              when={!burgerMenuOpen()}
              fallback={
                <AiOutlineClose
                  font-size="20"
                  onclick={() => setburgerMenuOpen(false)}
                />
              }
            >
              <FiMenu font-size="20" onclick={() => setburgerMenuOpen(true)} />
            </Show>
          </div>

          {/* logged in menu */}
          <Show when={isLoggedIn()}>
            <div class="horizontal-list items-center gap-12">
              <div class="relative">
                <VsCircleFilled class="absolute -right-4 -top-2" color="red" />
                <FaSolidCartShopping font-size="20" />
              </div>
              <AccountMenu />
            </div>
          </Show>
        </div>
      </div>
    </header>
  );
}
