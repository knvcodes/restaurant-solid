import { For, Show } from "solid-js";
import { IDish } from "../../types";
import { generateRandomImageUrl } from "../../utils/helpers";
import { randomDishUrls } from "../../utils/staticData";
import { openModal } from "../../store/modalStore";
import { handleRemoveDish, selectDish } from "../../store/restaurantStore";
import { FaSolidMinus, FaSolidPlus } from "solid-icons/fa";

interface DishCardProps {
  dish: IDish;
  showServeButtons?: boolean;
  serveCount?: number;
  serveType?: string;
  onMinus?: () => void;
  onPlus?: () => void;
  restaurantName: string;
}

export default function DishCard(props: DishCardProps) {
  const {
    dish,
    showServeButtons,
    serveCount,
    serveType,
    onMinus = () => {},
    onPlus = () => {},
    restaurantName,
  } = props;

  const handleDishClick = () => {
    openModal("dish");
    selectDish(dish, restaurantName);
  };

  const handleRemoveDishItem = (serving_id: string) => {
    if (dish) {
      handleRemoveDish(dish?.restaurantId, serving_id);
    }
  };

  return (
    <div class="dish-card" onclick={handleDishClick}>
      <div class="max-h-full">
        <img
          src={randomDishUrls[generateRandomImageUrl(randomDishUrls.length)]}
          alt="Avatar"
          class="md:min-w-[300px] max-h-[225px] h-full max-w-[300px] mx-auto object-cover pointer-events-none"
        />
      </div>
      <div class="flex flex-col w-full">
        <div class="flex justify-between w-full">
          <div class="title">{dish.name}</div>
          <Show when={showServeButtons}>
            <div class="serve-buttons flex items-center gap-2 bg-white px-2 w-28 justify-between">
              <FaSolidMinus
                onclick={(e) => {
                  onMinus();
                  e.stopPropagation();
                }}
              />
              <div>{serveCount}</div>
              <FaSolidPlus
                onclick={(e) => {
                  onPlus();
                  e.stopPropagation();
                }}
              />
            </div>
          </Show>
        </div>
        <div class="description">{dish.description}</div>

        <div class="label horizontal-list gap-4 md:mt-auto mt-4">
          <Show
            when={!showServeButtons}
            fallback={<div class="">{serveType}</div>}
          >
            <For each={dish.serving}>
              {(serving) => (
                <div class="verticle-list">
                  <div>{serving.type}</div>
                </div>
              )}
            </For>
          </Show>
        </div>
      </div>
    </div>
  );
}
