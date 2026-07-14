import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { foodbg } from "../assets/assets";
import {
  clearAllDishes,
  handleAddingDish,
  handleRemoveDish,
  restaurantStore,
} from "../store/restaurantStore";
import DishCard from "../components/restaurants/DishCard";
import { IDish, IServing } from "../types";

export default function Cart() {
  const cartItems = createMemo(() => restaurantStore.dishes);

  // add/remove dish functions
  const handleDish = (
    restaurantName: string,
    dish: IDish,
    serveItem: IServing,
  ) => {
    if (dish) {
      handleAddingDish(restaurantName, dish.restaurantId, serveItem._id, dish);
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
      <div class="relative pt-28 lg:px-12 md:px-0 lg:w-5/6  px-4 w-full mx-auto h-full flex-1 bg-white">
        <div class="horizontal-list justify-between">
          <div class="heading-3 mb-2">Orders</div>
          <div onclick={() => clearAllDishes()} class="cursor-pointer">
            Clear All Orders
          </div>
        </div>
        <hr class="mb-12" />

        <div class="verticle-list gap-20">
          <For each={cartItems()}>
            {(dish) => (
              <div>
                <div class="heading-3">{dish.restaurantName}</div>
                <For
                  each={dish.serving.filter(
                    (servingItem) => servingItem.total > 0,
                  )}
                >
                  {(serveItem) => (
                    <DishCard
                      restaurantName={dish.restaurantName}
                      onMinus={() => handleRemoveDishItem(dish, serveItem._id)}
                      onPlus={() =>
                        handleAddingDish(
                          dish.restaurantName,
                          dish.restaurantId,
                          serveItem._id,
                          dish,
                        )
                      }
                      serveType={serveItem.type}
                      dish={dish}
                      showServeButtons={true}
                      serveCount={serveItem.total}
                    />
                  )}
                </For>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
