import { createSignal } from "solid-js";
import { Button } from "@kobalte/core/button";

export default function Header() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 relative">
          {/* Logo on left */}
          <div class="flex-shrink-0 text-2xl font-bold text-indigo-600">
            MyBrand
          </div>

          {/* Desktop Nav (centered absolutely) */}
          <nav class="hidden md:flex space-x-6 text-gray-700 font-medium absolute left-1/2 -translate-x-1/2">
            <a href="#" class="hover:text-indigo-600 transition">
              Home
            </a>
            <a href="#" class="hover:text-indigo-600 transition">
              My Restaurants
            </a>
            <a href="#" class="hover:text-indigo-600 transition">
              Settings
            </a>
          </nav>

          <Button>Log In</Button>

          {/* Mobile Button on right */}
          <button
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen())}
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isOpen() ? (
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen() && (
        <div class="md:hidden bg-white border-t border-gray-200">
          <nav class="px-4 py-3 space-y-2 text-gray-700 font-medium">
            <a href="#" class="block hover:text-indigo-600 transition">
              Home
            </a>
            <a href="#" class="block hover:text-indigo-600 transition">
              My Restaurants
            </a>
            <a href="#" class="block hover:text-indigo-600 transition">
              Settings
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
