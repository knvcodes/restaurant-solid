import { For } from "solid-js";
import { IDish } from "../../types";
import { generateRandomImageUrl } from "../../utils/helpers";
import { randomDishUrls } from "../../utils/staticData";

export default function DishCard(props: { dish: IDish }) {
  const { dish } = props;

  console.info("dish:===>", dish);

  return (
    <div class="dish-card">
      <div>
        <img
          src={randomDishUrls[generateRandomImageUrl(randomDishUrls.length)]}
          alt="Avatar"
          class="h-full min-w-[300px] mx-auto object-cover pointer-events-none"
        />
      </div>
      <div class="flex flex-col">
        <div class="title">{dish.name}</div>
        <div class="description">{dish.description}</div>

        <div class="label horizontal-list gap-4 mt-auto ">
          <For each={dish.serving}>
            {(serving) => (
              <div class="verticle-list">
                <div>{serving.title}</div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
