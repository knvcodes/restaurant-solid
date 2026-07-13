import { createStore } from "solid-js/store";
import { IDish, IServing } from "../types";
import { makePersisted } from "@solid-primitives/storage";

interface RestaurantState {
  dishes: IDish[];
  selectedDish: IDish | null;
}

// Initialize store
const [restaurantStore, setrestaurantStore] = createStore<RestaurantState>({
  dishes: [],
  selectedDish: null,
});

const [persistedRestaurantStore, persistedSetRestaurantStore] = makePersisted(
  [restaurantStore, setrestaurantStore],
  {
    name: "restaurantStore",
    storage: sessionStorage,
  },
);

export {
  persistedRestaurantStore as restaurantStore,
  persistedSetRestaurantStore as setrestaurantStore,
};

export const handleAddingDish = (
  restaurant_id: string,
  serving_id: string,
  dish: IDish,
) => {
  const dishExist = restaurantStore.dishes.find(
    (dishItem) => dishItem.id == dish.id,
  );

  if (dishExist) {
    const newList = restaurantStore.dishes.map((dishItem) => {
      if (dishItem.restaurantId == restaurant_id) {
        return {
          ...dishItem,
          serving: dishItem.serving.map((servingItem) => {
            if (servingItem._id == serving_id) {
              return {
                ...servingItem,
                total: servingItem.total + 1,
              };
            } else {
              return servingItem;
            }
          }),
        };
      } else {
        return dishItem;
      }
    });

    persistedSetRestaurantStore({
      dishes: newList,
    });
  } else {
    persistedSetRestaurantStore({
      dishes: [
        ...restaurantStore.dishes,
        {
          ...dish,
          serving: dish.serving.map((servingItem) => {
            if (servingItem._id == serving_id) {
              return {
                ...servingItem,
                total: servingItem.total + 1,
              };
            } else {
              return servingItem;
            }
          }),
        },
      ],
    });
  }
};

export const handleRemoveDish = (restaurant_id: string, serving_id: string) => {
  const newList = restaurantStore.dishes.map((dishItem) => {
    if (dishItem.restaurantId == restaurant_id) {
      return {
        ...dishItem,
        serving: dishItem.serving.map((servingItem) => {
          if (servingItem._id == serving_id) {
            return {
              ...servingItem,
              total: servingItem.total > 0 ? servingItem.total - 1 : 0,
            };
          } else {
            return servingItem;
          }
        }),
      };
    } else {
      return dishItem;
    }
  });

  persistedSetRestaurantStore({
    dishes: newList,
  });
};

export const removeRestaurantDishes = (restaurant_id: string) => {
  const newList = restaurantStore.dishes.filter((dishItem) => {
    if (dishItem.restaurantId == restaurant_id) {
      return false;
    } else {
      return true;
    }
  });

  persistedSetRestaurantStore({
    dishes: newList,
  });
};

export const selectDish = (dish: IDish) => {
  persistedSetRestaurantStore({
    ...restaurantStore,
    selectedDish: dish,
  });
};
