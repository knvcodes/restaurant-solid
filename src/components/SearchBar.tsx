import { createEffect, createSignal } from "solid-js";

export default function SearchBar(props: {
  onChange?: ((value: string) => void) | undefined;
}) {
  const { onChange = () => {} } = props;
  const [search, setSearch] = createSignal<string>("");

  // access value by search()
  // createEffect runs automatically when any signal is changed, only ones defined inside are tracked

  createEffect(() => {
    const searchValue = search();
    onChange(searchValue);
  });

  return (
    <input
      type="text"
      onInput={(e) => setSearch(e.currentTarget.value)}
      placeholder="Search your restaurants..."
      class="mb-12 search__input p-2 px-4 bg-white border-b border-gray-200/60 w-full"
    />
  );
}
