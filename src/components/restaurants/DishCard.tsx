import { For } from "solid-js";
import { IDish } from "../../types";
import { generateRandomImageUrl } from "../../utils/helpers";
import { randomDishUrls } from "../../utils/staticData";
import { openModal } from "../../store/modalStore";
import { selectDish } from "../../store/restaurantStore";

interface DishCardProps {
  dish: IDish;
}

export default function DishCard(props: DishCardProps) {
  const { dish } = props;

  const handleDishClick = () => {
    openModal("dish");
    selectDish(dish);
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
      <div class="flex flex-col">
        <div class="title">{dish.name}</div>
        <div class="description">{dish.description}</div>

        <div class="label horizontal-list gap-4 md:mt-auto mt-4">
          <For each={dish.serving}>
            {(serving) => (
              <div class="verticle-list">
                <div>{serving.type}</div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
