import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { closeModal, modalStore } from "../../store/modalStore";
import {
  addDish,
  deleteDish,
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

  // mapping to show serving selection
  const selectedDishIds = createMemo(() =>
    restaurantStore.dishes.length > 0
      ? restaurantStore.dishes.map((dishItem) => dishItem.serving_id)
      : [],
  );

  // obj for selection mapping
  const [selectedDishes, setselectedDishes] = createSignal<
    Record<string, number>
  >({});

  createEffect(() => {
    if (restaurantStore.dishes.length > 0) {
      let newDishObj: Record<string, number> = {};
      restaurantStore.dishes.forEach((dishItem) => {
        newDishObj[dishItem.serving_id] = dishItem.serving_quantity;
      });

      setselectedDishes(newDishObj);
    } else {
      setselectedDishes({});
    }
  });

  // add/remove dish functions
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

  const handleRemoveDish = (serving_id: string) => {
    deleteDish(serving_id);
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
                <div class="horizontal-list gap-2 my-4">
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
                                handleRemoveDish(serveItem._id);
                                e.stopPropagation();
                              }}
                            />
                            <div>{selectedDishes()[serveItem._id]}</div>
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
                  <Show when={Object.keys(selectedDishes()).length > 0}>
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
