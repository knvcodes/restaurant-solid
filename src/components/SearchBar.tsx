import { ImCancelCircle } from "solid-icons/im";
import { onCleanup } from "solid-js";
import { createEffect, createSignal } from "solid-js";

export default function SearchBar(props: {
  onChange?: ((value: string) => void) | undefined;
}) {
  const { onChange = () => {} } = props;
  const [search, setSearch] = createSignal<string>("");

  let timer: ReturnType<typeof setTimeout>;

  // access value by search()
  // createEffect runs automatically when any signal is changed, only ones defined inside are tracked

  createEffect(() => {
    const searchValue = search();

    clearTimeout(timer);
    timer = setTimeout(() => {
      onChange(searchValue);
    }, 500);
  });

  onCleanup(() => clearTimeout(timer));

  return (
    <div class="relative">
      <input
        type="text"
        value={search()}
        onInput={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search your restaurants..."
        class="mb-12 search__input p-2 px-4 bg-white border-b border-gray-200/60 w-full"
      />
      <ImCancelCircle
        font-size="20"
        onclick={() => setSearch("")}
        class="absolute right-5 top-0 translate-y-1/2"
      />
    </div>
  );
}
