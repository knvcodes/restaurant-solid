import { createEffect, createMemo, For, Show } from "solid-js";
import { CustomModal } from "../custom/CustomModal";
import { closeModal, modalStore } from "../../store/modalStore";
import {
  removeSelectedDish,
  restaurantStore,
} from "../../store/restaurantStore";
import { CustomButton } from "../custom/CustomButton";
import { generateRandomImageUrl } from "../../utils/helpers";
import { randomDishUrls } from "../../utils/staticData";

export default function DishModal() {
  createEffect(() => {
    console.info(
      "restaurantStore.selectedDish:===>",
      restaurantStore.selectedDish,
    );
  });

  const dishItem = createMemo(() => restaurantStore.selectedDish);

  return (
    <Show when={modalStore.type == "dish"}>
      <Show when={dishItem()} keyed>
        {({ name, description, serving }) => (
          <div class="modal-overlay flex-center">
            <div class="max-w-3xl bg-white">
              <img
                src={
                  randomDishUrls[generateRandomImageUrl(randomDishUrls.length)]
                }
                alt="Avatar"
                class="min-w-[300px] max-w-[500px] aspect-[16/9] mx-auto object-cover pointer-events-none"
              />

              <div class="my-4 px-2">
                <div class="heading-2">{name}</div>
                <div class="description">{description}</div>

                <div class="verticle-list gap-2 my-4">
                  <For each={serving}>
                    {(serveItem) => (
                      <div class="bg-amber-400 font-bold rounded-md px-2 py-4">
                        <div class="horizontal-list gap-4">
                          <div>{serveItem.title}</div>
                          <div>Quantity: {serveItem.value}</div>
                          <div class="ml-auto">
                            {serveItem.price} {serveItem.currency}
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              {/* <CustomButton
              label={rightBtnText || ""}
              onClick={rightBtnFn}
              disabled={props.invalid}
              isLoading={props.isLoading} */}
              {/* /> */}
            </div>
          </div>
        )}
      </Show>
    </Show>
  );
}
