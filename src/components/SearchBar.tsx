import { createEffect, createSignal } from "solid-js";

export default function SearchBar() {
  const [search, setSearch] = createSignal();

  // access value by search()
  // createEffect runs automatically when any signal is changed

  createEffect(() => {
    console.log("sd", search());
  });

  return (
    <input
      type="text"
      placeholder="Search your restaurants..."
      class="mb-12 search__input p-2 px-4 bg-white border-b border-gray-200/60 w-full"
    />
  );
}
