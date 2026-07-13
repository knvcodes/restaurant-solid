import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { closeModal, modalStore } from "../../store/modalStore";
import {
  handleAddingDish,
  handleRemoveDish,
  removeRestaurantDishes,
  restaurantStore,
} from "../../store/restaurantStore";
import { CustomButton } from "../custom/CustomButton";
import { generateRandomImageUrl } from "../../utils/helpers";
import { randomDishUrls } from "../../utils/staticData";
import CustomTooltip from "../custom/CustomTooltip";
import { IServing } from "../../types";
import { FaSolidMinus, FaSolidPlus } from "solid-icons/fa";

export default function DishModal() {
  const dishItem = createMemo(() => restaurantStore.selectedDish);

  const [dishCount, setdishCount] = createSignal<Record<string, number>>({});

  // mapping to show serving selection
  const selectedDishIds = createMemo(() => {
    if (restaurantStore.dishes.length > 0) {
      const selectedDishObj = restaurantStore.dishes.find(
        (dishItem) => dishItem.id == restaurantStore.selectedDish?.id,
      );
      const ids = selectedDishObj?.serving
        .filter((servingItem) => servingItem.total > 0)
        .map((serveItem) => {
          return {
            _id: serveItem._id,
            total: serveItem.total,
          };
        });

      if (ids && ids.length > 0) {
        let newObj: Record<string, number> = {};
        ids.forEach((idItem) => {
          newObj[idItem._id] = idItem.total;
        });
        setdishCount(newObj);
      }

      if (ids) {
        return ids.map((serveItem) => serveItem._id);
      } else {
        return [];
      }
    } else {
      return [];
    }
  });

  // add/remove dish functions
  const handleDish = (serveItem: IServing) => {
    const dish = dishItem();

    if (dish) {
      handleAddingDish(dish.restaurantId, serveItem._id, dish);
    }
  };

  const handleRemoveDishItem = (serving_id: string) => {
    const dish = dishItem();

    if (dish) {
      handleRemoveDish(dish?.restaurantId, serving_id);
    }
  };

  return (
    <Show when={modalStore.type == "dish"}>
      <Show when={dishItem()} keyed>
        {({ name, description, serving, metadata, restaurantId }) => (
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
                <div class="description mb-4">{description}</div>
                <div class="flex md:flex-row flex-col md:gap-2 gap-1 my-4">
                  <For each={serving}>
                    {(serveItem) => (
                      <div
                        class={`serve-item`}
                        onclick={() => handleDish(serveItem)}
                      >
                        <div class="type">{serveItem.type}</div>
                        <div class="serving">Serves: {serveItem.value}</div>

                        <div class="serving-price">
                          {serveItem.price} {serveItem.currency}
                        </div>
                        <Show when={selectedDishIds().includes(serveItem._id)}>
                          <div class="serve-buttons">
                            <FaSolidMinus
                              onclick={(e) => {
                                handleRemoveDishItem(serveItem._id);
                                e.stopPropagation();
                              }}
                            />
                            <div>{dishCount()[serveItem._id]}</div>
                            <FaSolidPlus
                              onclick={(e) => {
                                handleDish(serveItem);
                                e.stopPropagation();
                              }}
                            />
                          </div>
                        </Show>
                      </div>
                    )}
                  </For>
                </div>

                <div class="horizontal-list gap-2">
                  <CustomButton
                    label={"Cancel"}
                    extraClasses="!bg-transparent button-border"
                    onClick={() => {
                      closeModal();
                      removeRestaurantDishes(restaurantId);
                    }}
                  />
                  <Show when={Object.keys(selectedDishIds()).length > 0}>
                    <CustomButton label={"Add"} onClick={() => closeModal()} />
                  </Show>
                </div>
              </div>
            </div>
          </div>
        )}
      </Show>
    </Show>
  );
}
