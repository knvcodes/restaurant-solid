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
    <>
      <Search
        triggerMode="focus"
        debounceOptionsMillisecond={800}
        options={optionsS}
        class="mb-12"
        onInputChange={(query) => {
          console.log(query);

          setSearch(query);
        }}
        onChange={(result) => setEmoji(result)}
        placeholder="Search a restaurant..."
        itemComponent={(props) => (
          <Search.Item item={props.item} class="search__item">
            <Search.ItemLabel>{props.item.rawValue.label}</Search.ItemLabel>
          </Search.Item>
        )}
      >
        <Search.Control class="search__control" aria-label="Emoji">
          <Search.Input class="search__input rounded-xl p-2 px-4 border border-gray-200/60 w-full" />
        </Search.Control>
        <Search.Portal>
          <Search.Content
            class="search__content"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <Search.Listbox class="search__listbox" />
            <Search.NoResult class="search__no_result">
              😬 No emoji found
            </Search.NoResult>
          </Search.Content>
        </Search.Portal>
      </Search>
      <div class="result__content">
        {/* Emoji selected: {emoji()?.emoji} {emoji()?.name} */}
      </div>
    </>
  );
}
