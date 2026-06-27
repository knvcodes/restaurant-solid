import { createEffect, createMemo, For, Show } from "solid-js";
import { closeModal, modalStore } from "../../store/modalStore";
import { addDish, restaurantStore } from "../../store/restaurantStore";
import { CustomButton } from "../custom/CustomButton";
import { generateRandomImageUrl } from "../../utils/helpers";
import { randomDishUrls } from "../../utils/staticData";
import CustomTooltip from "../custom/CustomTooltip";
import { IServing } from "../../types";

export default function DishModal() {
  createEffect(() => {
    console.info(
      "restaurantStore.selectedDish:===>",
      restaurantStore.selectedDish,
      restaurantStore.dishes,
    );
  });

  const dishItem = createMemo(() => restaurantStore.selectedDish);

  const handleDish = (serveItem: IServing) => {
    const dish = dishItem();

    if (dish) {
      addDish({
        ...dish,
        serving_id: serveItem._id,
        serving_quantity: 1,
        serving: serveItem,
      });
    }
  };

  return (
    <Show when={modalStore.type == "dish"}>
      <Show when={dishItem()} keyed>
        {({ name, description, serving, metadata }) => (
          <div
            class="modal-overlay flex-center"
            onclick={(e) => e.stopPropagation()}
          >
            <div class="dish-modal">
              <img
                src={
                  randomDishUrls[generateRandomImageUrl(randomDishUrls.length)]
                }
                alt="Avatar"
                class="min-w-[300px] max-w-[500px] aspect-[16/9] mx-auto object-cover pointer-events-none"
              />

              <div class="my-4 px-4">
                <div class="horizontal-list">
                  <div class="inline-block heading-2">{name}</div>
                  <CustomTooltip>
                    <div> Calories: {metadata.calories} cal</div>
                    <div> Prep Time: {metadata.prepTimeMinutes} mins</div>
                  </CustomTooltip>
                </div>
                <div class="description">{description}</div>
                <div class="horizontal-list gap-2 my-4">
                  <For each={serving}>
                    {(serveItem) => (
                      <div
                        class="border-1 pt-4 rounded-md cursor-pointer hover:bg-amber-100"
                        onclick={() => handleDish(serveItem)}
                      >
                        <div class="px-4 font-semibold">{serveItem.type}</div>
                        <div class="px-4 italic mb-4 opacity-70">
                          Serves: {serveItem.value}
                        </div>
                        <div class="ml-auto px-2 py-2 text-center font-bold text-white bg-amber-400">
                          {serveItem.price} {serveItem.currency}
                        </div>
                      </div>
                    )}
                  </For>
                </div>
                <CustomButton label={"Cancel"} onClick={() => closeModal()} />
              </div>
            </div>
          </div>
        )}
      </Show>
    </Show>
  );
}
