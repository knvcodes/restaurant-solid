import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { foodbg } from "../assets/assets";
import {
  handleAddingDish,
  handleRemoveDish,
  restaurantStore,
} from "../store/restaurantStore";
import DishCard from "../components/restaurants/DishCard";
import { IDish, IServing } from "../types";

export default function Cart() {
  const cartItems = createMemo(() => restaurantStore.dishes);

  console.info("cartItems:===>", cartItems());

  // add/remove dish functions
  const handleDish = (dish: IDish, serveItem: IServing) => {
    if (dish) {
      handleAddingDish(dish.restaurantId, serveItem._id, dish);
    }
  };

  const handleRemoveDishItem = (dish: IDish, serving_id: string) => {
    if (dish) {
      handleRemoveDish(dish?.restaurantId, serving_id);
    }
  };

  return (
    <div class="min-h-[calc(100vh-64px)] flex flex-col">
      <div
        class="absolute h-full w-full"
        style={{
          "background-image": `url(${foodbg})`,
          "background-size": "500px",
          "background-repeat": "repeat",
          opacity: 0.1,
        }}
      ></div>
      <div class="relative pt-28 lg:px-12 md:px-0 lg:w-5/6 sm:w-full mx-auto h-full flex-1 bg-white">
        <div class="heading-3 mb-2">Orders</div>
        <hr class="mb-8" />

        <div class="verticle-list gap-4">
          <For each={cartItems()}>
            {(dish) => (
              <For each={dish.serving}>
                {(serveItem) => (
                  <DishCard
                    onMinus={() => handleRemoveDishItem(dish, serveItem._id)}
                    onPlus={() =>
                      handleAddingDish(dish.restaurantId, serveItem._id, dish)
                    }
                    serveType={serveItem.type}
                    dish={dish}
                    showServeButtons={true}
                    serveCount={serveItem.total}
                  />
                )}
              </For>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
