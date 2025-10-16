import { Search } from "@kobalte/core/search";
import { createEffect, createSignal } from "solid-js";

export default function SearchBar() {
  const [emoji, setEmoji] = createSignal();

  const [search, setSearch] = createSignal();

  // access value by search()
  // createEffect runs automatically when any signal is changed

  createEffect(() => {
    console.log("sd", search());
  });

  interface x {
    label: string;
    value: string;
  }

  const optionsS: x[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ];

  return (
    <input
      type="text"
      placeholder="Search your restaurants..."
      class="mb-12 search__input rounded-xl p-2 px-4 border border-gray-200/60 w-full"
    />
  );
}
